import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import passwordHelper from "../helpers/hashed_password_helpers"
import jwtHelper, {ITokenCredantials} from "../helpers/jwt_helpers"
import User, {IUser} from "../models/users"
require('dotenv').config();
const jwt = require("jsonwebtoken")

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const {email, username, password}: { email: string, username: string, password: string } = req.body;
    const hashedPassword = passwordHelper.hashPassword(password);
    const tokens: ITokenCredantials = jwtHelper.createJWT(email, username);
    const user: IUser = new User({
        _id: new mongoose.Types.ObjectId(),
        email: email,
        username: username,
        password: hashedPassword,
        _refreshToken: tokens.refresh_token
    })
    return await user
        .save()
        .then((user: IUser) => res.status(201).json({ 
            username: user.username,
            email: user.email,
            accessToken: tokens.access_token,
            refreshToken: user._refreshToken,
            }))
        .catch(err => res.status(500).json({ err }));
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const {email, password}: { email: string, password: string } = req.body;
    const user: IUser =  await User
    .findOne({email: email});
    console.log(user);
    if(user) {
        const compare = passwordHelper.comparePasswords(password, user.password);
        if(compare) {
            const tokens: ITokenCredantials = jwtHelper.createJWT(user.email, user.username);
            await User.updateOne({ _id: user._id }, {_refreshToken: tokens.refresh_token })
            res.status(201).json({
                username: user.username,
                email: user.email,
                accessToken: tokens.access_token,
                refreshToken: tokens.refresh_token,
                })
        } else {
            res.status(400).json({ err: "Wrong password" })
        }
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

const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
    return res.status(401).json({ error: 'Token missing from Authorization header' });
    }
    let decoded;
    try {
        decoded = jwt.verify(token, process.env.REFRESH_SECRET);
    } catch (error) {
        return res.status(401).json({ error: error });
    }
    const user = await User
            .findOne({email: decoded.email})
    
    if(!user) {
        return res.status(401).json({ error: 'There is no user with this token' });
    }
    if(token === user._refreshToken) {
        const tokens: ITokenCredantials = jwtHelper.createJWT(user.email, user.username);
            await User.updateOne({ email: user.email }, { _refreshToken: tokens.refresh_token })
            return res.status(201).json({
                accessToken: tokens.access_token,
                refreshToken: tokens.refresh_token,
                })
    }
    return res.status(401).json({ error: 'There is no user with this token' });
    
};

const readAllUsers = async (req: Request, res: Response, next: NextFunction) => {

};
const updateUser = async (req: Request, res: Response, next: NextFunction) => {

};
const deleteUser = async (req: Request, res: Response, next: NextFunction) => {

};

export default {createUser, readUser, readAllUsers, updateUser, deleteUser, loginUser, refreshToken}