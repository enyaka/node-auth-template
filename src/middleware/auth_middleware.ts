import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken")
require('dotenv').config();

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1];
    console.log(token);

    if (!token) {
    return res.status(401).json({ error: 'Token missing from Authorization header' });
    }
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
    } catch (error) {
        return res.status(401).json({ error: error });
    }
    next();
}
