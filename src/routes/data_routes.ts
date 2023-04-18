import express, { Application, Router, Request, Response, NextFunction } from 'express';
import controller from "../controllers/data"
import { checkAuth } from "../middleware/auth_middleware";
const router: Router = express.Router();

router.get('/get-data',checkAuth, controller.getData);


module.exports = router