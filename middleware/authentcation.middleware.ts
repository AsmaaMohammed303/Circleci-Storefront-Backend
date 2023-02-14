import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../middleware/config';
//import Error from '../interfaces/error.interfaces';

//import { Console } from 'console';

export const validateTokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    res.status(401).json({ error: 'Login Error: Please Try Again' });
    return false;
  }
  try {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, config.tokenSecret as unknown as string);
    next();
  } catch (error) {
    res.status(401);
    res.json('Login Error: Please Try Again');
    return;
  }
};

export default validateTokenMiddleware;
