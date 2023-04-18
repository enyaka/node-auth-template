import express, { Application, Router, Request, Response, NextFunction } from 'express';
const app: Application = express();

app.use(express.json())

const authRoutes: Router = require("./routes/auth_routes");

app.use('/auth', authRoutes);

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ success: "Hello server"});
});



module.exports = app;