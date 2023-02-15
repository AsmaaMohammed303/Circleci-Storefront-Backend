"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = exports.deleteorder = exports.deleteAllOrders = exports.updateorder = exports.getSpecificorder = exports.getAllorders = exports.createorder = void 0;
//import { request } from 'http';
const order_model_1 = __importDefault(require("../models/order.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//import { config } from 'dotenv';
const config_1 = __importDefault(require("../middleware/config"));
const user_model_1 = __importDefault(require("../models/user.model"));
//create instaance from class productmodel
const objUserModel = new user_model_1.default();
//create instaance from class ordermodel
const objorderModel = new order_model_1.default();
//************************************* create *********************************************** */
const createorder = async (req, res, next) => {
    try {
        const product_id = req.body.product_id;
        const quantity = req.body.quantity;
        /*
        if (!product_id || !quantity) {
          res.status(400);
          res.send('Please Insert The Correct Params! eg. :product_id, :quantity');
          return false;
        }
    */
        //console.log(req.body);
        const order = await objorderModel.create(req.body);
        res.json({
            status: 'sucess',
            data: { ...order },
            message: 'order created sucessfully',
        });
    }
    catch (error) {
        //عشان عاملين error handling
        next(error);
    }
};
exports.createorder = createorder;
//********************************Get All order********************************************* */
const getAllorders = async (req, res, next) => {
    try {
        //console.log(req.body);
        const orders = await objorderModel.getAllorders();
        res.json({
            status: 'success',
            data: jsonwebtoken_1.default.sign({ orders }, config_1.default.tokenSecret),
            message: 'All orders Returned Successfully',
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllorders = getAllorders;
//********************************Get specific order********************************************* */
const getSpecificorder = async (req, res, next) => {
    try {
        const id = req.params.id;
        /*if (!id) {
          res.status(400).send('Please, Insert The Required Param id! eg. :id.');
          return false;
        }*/
        //console.log(req.body);
        const order = await objorderModel.getSpecificorder(req.params.id);
        if (!order) {
            return res.status(404).json({ message: '404 not found' });
        }
        res.json({
            status: 'success',
            data: jsonwebtoken_1.default.sign({ order }, config_1.default.tokenSecret),
            message: 'order Is Returned Successfully',
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getSpecificorder = getSpecificorder;
//********************************update order********************************************* */
const updateorder = async (req, res, next) => {
    try {
        const product_id = req.body.product_id;
        const quantity = req.body.quantity;
        const id = req.body.id;
        if (!product_id || !quantity || !id) {
            res.status(400);
            res.send('Please Insert The Correct Params! eg. :product_id, :quantity , :id');
            return false;
        }
        //محتاجين نعمل express validator عشان نتأكد ان الداتا راجعه صح
        const order = await objorderModel.update(req.body);
        res.json({
            status: 'success',
            data: order,
            message: 'order Updated Successfully',
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateorder = updateorder;
//********************************delete all Orders******************************************* */
const deleteAllOrders = async (req, res, next) => {
    try {
        const order = await objorderModel.deleteAllOrders();
        res.json({
            status: 'success',
            data: order,
            message: 'Orders Deleted Successfully',
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteAllOrders = deleteAllOrders;
//********************************delete order********************************************* */
const deleteorder = async (req, res, next) => {
    try {
        const id = req.params.id;
        //console.log(id);
        /*if (!id) {
          res.status(400).send('Please, Insert The Required Param id! eg. :id.');
          return false;
        }*/
        const order = await objorderModel.delete(req.params.id);
        res.json({
            status: 'success',
            data: order,
            message: 'order Deleted Successfully',
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteorder = deleteorder;
//********************************authenticate********************************************* */
const authenticate = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await objUserModel.authenticateUser(email, password);
        //لو رجع يوزر هنعمل GENERATE TO TOKEN
        const token = jsonwebtoken_1.default.sign({ user }, config_1.default.tokenSecret);
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
