import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

const getData = async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ message: "Token is valid "})
};

export default { getData }