"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTokenMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../middleware/config"));
//import Error from '../interfaces/error.interfaces';
//import { Console } from 'console';
const validateTokenMiddleware = (req, res, next) => {
    if (!req.headers.authorization) {
        res.status(401).json({ error: 'Login Error: Please Try Again' });
        return false;
    }
    try {
        const token = req.headers.authorization.split(' ')[1];
        jsonwebtoken_1.default.verify(token, config_1.default.tokenSecret);
        next();
    }
    catch (error) {
        res.status(401);
        res.json('Login Error: Please Try Again');
        return;
    }
};
exports.validateTokenMiddleware = validateTokenMiddleware;
exports.default = exports.validateTokenMiddleware;
