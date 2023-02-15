"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = exports.deleteAllUsers = exports.deleteUser = exports.updateUser = exports.getSpecificUser = exports.getAllUsers = exports.createUser = void 0;
//import { request } from 'http';
const user_model_1 = __importDefault(require("../models/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//import { config } from 'dotenv';
const config_1 = __importDefault(require("../middleware/config"));
//create instaance from class usermodel
const objUserModel = new user_model_1.default();
let token = '';
//************************************* create *********************************************** */
const createUser = async (req, res, next) => {
    try {
        const first_name = req.body.first_name;
        const last_name = req.body.last_name;
        const user_name = req.body.user_name;
        const password = req.body.password;
        const email = req.body.email;
        if (!first_name || !last_name || !user_name || !password || !email) {
            res.status(400);
            res.send('Please Insert The Correct Params! eg. :first_name, :last_name, :user_name, :password , :email');
            return false;
        }
        //console.log(req.body);
        const user = await objUserModel.create(req.body);
        res.json({
            status: 'sucess',
            data: { ...user },
            message: 'user created sucessfully',
        });
    }
    catch (error) {
        //عشان عاملين error handling
        next(error);
    }
};
exports.createUser = createUser;
//********************************Get All User********************************************* */
const getAllUsers = async (req, res, next) => {
    try {
        //console.log(req.body);
        const users = await objUserModel.getAllUsers();
        res.json({
            status: 'success',
            data: jsonwebtoken_1.default.sign({ users }, config_1.default.tokenSecret),
            message: 'All Users Returned Successfully',
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllUsers = getAllUsers;
//********************************Get specific User********************************************* */
const getSpecificUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        /*
        if (!id) {
          console.log('here');
          res.json({
            status: 400,
            data: '', //jwt.sign({ user }, cconfig.tokenSecret as unknown as string),
            message: 'Please, Insert The Required Param id! eg. :id.',
          });
          return res;
        }
    */
        //console.log(req.body);
        const userEXist = await objUserModel.getSpecificUser(req.params.id);
        if (!userEXist) {
            res.json({
                status: 404,
                data: userEXist,
                message: 'user not found',
            });
            return res;
        }
        res.json({
            status: 'success',
            data: '',
            message: 'User Is Returned Successfully',
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getSpecificUser = getSpecificUser;
//********************************update User********************************************* */
const updateUser = async (req, res, next) => {
    try {
        const first_name = req.body.first_name;
        const last_name = req.body.last_name;
        const user_name = req.body.user_name;
        const password = req.body.password;
        const email = req.body.email;
        const id = req.body.id;
        /*
        if (!id) {
          res.status(400).send('Please, Insert The Required Param id! eg. :id.');
          return false;
        }
    */
        const userEXist = await objUserModel.getSpecificUser(req.params.id);
        if (!userEXist) {
            res.json({
                status: 404,
                data: userEXist,
                message: 'user not found',
            });
            return res;
        }
        if (!first_name || !last_name || !user_name || !password || !email) {
            res.status(400);
            res.send('Please Insert The Correct Params! eg. :first_name, :last_name, :user_name, :password , :email ');
            return false;
        }
        //محتاجين نعمل express validator عشان نتأكد ان الداتا راجعه صح
        const user = await objUserModel.update(req.body);
        res.json({
            status: 'success',
            data: user,
            message: 'User Updated Successfully',
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateUser = updateUser;
//********************************delete User********************************************* */
const deleteUser = async (req, res, next) => {
    try {
        /*
        const id = req.params.id as unknown as string;
       
        if (!id) {
          res.status(400).send('Please, Insert The Required Param id! eg. :id.');
          return false;
        }
    */
        const userEXist = await objUserModel.getSpecificUser(req.params.id);
        if (!userEXist) {
            res.json({
                status: 404,
                data: userEXist,
                message: 'user not found',
            });
            return res;
        }
        const user = await objUserModel.delete(req.params.id);
        res.json({
            status: 'success',
            data: user,
            message: 'User Deleted Successfully',
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteUser = deleteUser;
//********************************delete all Users******************************************* */
const deleteAllUsers = async (req, res, next) => {
    try {
        const user = await objUserModel.deleteAllUsers();
        res.json({
            status: 'success',
            data: user,
            message: 'Users Deleted Successfully',
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteAllUsers = deleteAllUsers;
//********************************authenticate********************************************* */
const authenticate = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await objUserModel.authenticateUser(email, password);
        //لو رجع يوزر هنعمل GENERATE TO TOKEN
        token = jsonwebtoken_1.default.sign({ user }, config_1.default.tokenSecret);
        if (!user) {
            return res.status(401).json({
                status: 'error',
                message: 'User Name And Password Not Match Pleace , Please Try Again',
            });
        }
        return res.json({
            status: 'success',
            data: { user, token },
            message: 'User Authenticated Successfully',
        });
    }
    catch (error) {
        next(error);
    }
};
exports.authenticate = authenticate;
exports.default = token;
