import { Request, Response, NextFunction } from "express";
import { createHash } from 'crypto';
import mongoose from "mongoose";
import passwordHelper from "../helpers/hashed_password_helpers"
import jwtHelper, {ITokenCredantials} from "../helpers/jwt_helpers"
import User, {IUser} from "../models/users"

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const {email, username, password}: { email: string, username: string, password: string } = req.body;
    const hashedPassword = passwordHelper.hashPassword(password);
    const user: IUser = new User({
        _id: new mongoose.Types.ObjectId(),
        email: email,
        username: username,
        password: hashedPassword,
    })
    const jwtCredantials: ITokenCredantials = jwtHelper.setNewUserJWT(email, username);
    return await user
        .save()
        .then((user: IUser) => res.status(201).json({ user, jwtCredantials }))
        .catch(err => res.status(500).json({ err }));
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const {email, password}: { email: string, password: string } = req.body;
    const returnedUser: IUser =  await User
    .findOne({email: email});
    console.log(returnedUser);
    if(returnedUser) {
        const compare = passwordHelper.comparePasswords(password, returnedUser.password);
        compare ? res.status(201).json( {returnedUser} ) : res.status(401).json({ err: "Wrong password" })
    } else {
        res.status(404).json({ err:  "User not found"})
    }
};

const readUser = async (req: Request, res: Response, next: NextFunction) => {
    const email: string = req.query.byEmail as string
    const id: string = req.query.byId as string
    if(email) {
        console.log("Read user by email -> " + email);
        return await User
            .findOne({email: email})
            .then(user => user ? res.status(201).json(user) : res.status(404).json({ error: "Not found" }))
    }else if(id) {
        console.log("Read user by id -> " + id);
        return await User
            .findById(id)
            .then((user: IUser) => res.status(201).json(user))
            .catch(err => res.status(404).json(err));
    } else {
        console.log("Paramater error. Email: " + email + " id: " + id);
        res.status(500).json({ error: "error"})
    }
    
};
const readAllUsers = async (req: Request, res: Response, next: NextFunction) => {

};
const updateUser = async (req: Request, res: Response, next: NextFunction) => {

};
const deleteUser = async (req: Request, res: Response, next: NextFunction) => {

};

export default {createUser, readUser, readAllUsers, updateUser, deleteUser, loginUser}