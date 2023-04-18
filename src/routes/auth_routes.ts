import express, { Application, Router, Request, Response, NextFunction } from 'express';
const router: Router = express.Router();

const validateUserFields = require('../helpers/validate_helpers').validateUserFields;

router.post('/create-account', validateUserFields, (req: Request, res: Response, next: NextFunction) => {
    const {email, username, password}: { email: string, username: string, password: string } = req.body;
    res.status(200).json({email, username, password});
});

module.exports = router