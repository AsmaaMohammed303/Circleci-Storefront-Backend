"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = exports.deleteproduct = exports.deleteAllproducts = exports.updateproduct = exports.getSpecificproduct = exports.getAllproducts = exports.createproduct = void 0;
//import { request } from 'http';
const product_model_1 = __importDefault(require("../models/product.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//import { config } from 'dotenv';
const config_1 = __importDefault(require("../middleware/config"));
const user_model_1 = __importDefault(require("../models/user.model"));
//create instaance from class productmodel
const objproductModel = new product_model_1.default();
const objUserModel = new user_model_1.default();
//************************************* create *********************************************** */
const createproduct = async (req, res, next) => {
    try {
        const proName = req.body.proName;
        const price = req.body.price;
        if (!proName || !price) {
            res.status(400);
            res.send('Please Insert The Correct Params! eg. :proName, :price');
            return false;
        }
        //console.log(req.body);
        const product = await objproductModel.create(req.body);
        res.json({
            status: 'sucess',
            data: { ...product },
            message: 'product created sucessfully',
        });
    }
    catch (error) {
        //عشان عاملين error handling
        next(error);
    }
};
exports.createproduct = createproduct;
//********************************Get All product********************************************* */
const getAllproducts = async (req, res, next) => {
    try {
        //console.log(req.body);
        const products = await objproductModel.getAllproducts();
        res.json({
            status: 'success',
            data: jsonwebtoken_1.default.sign({ products }, config_1.default.tokenSecret),
            message: 'All products Returned Successfully',
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllproducts = getAllproducts;
//********************************Get specific product********************************************* */
const getSpecificproduct = async (req, res, next) => {
    try {
        /*const id = req.params.id as unknown as string;
        if (!id) {
          res.status(400).send('Please, Insert The Required Param id! eg. :id.');
          return false;
        }*/
        //console.log(req.body);
        const product = await objproductModel.getSpecificproduct(req.params.id);
        if (!product) {
            return res.status(404).json({ message: '404 not found' });
        }
        res.json({
            status: 'success',
            data: '',
            message: 'product Is Returned Successfully',
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getSpecificproduct = getSpecificproduct;
//********************************update product********************************************* */
const updateproduct = async (req, res, next) => {
    try {
        const proName = req.body.proName;
        const price = req.body.price;
        const id = req.body.id;
        if (!proName || !price || !id) {
            res.status(400);
            res.send('Please Insert The Correct Params! eg. :proName, :price , :id');
            return false;
        }
        //محتاجين نعمل express validator عشان نتأكد ان الداتا راجعه صح
        const product = await objproductModel.update(req.body);
        res.json({
            status: 'success',
            data: product,
            message: 'product Updated Successfully',
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateproduct = updateproduct;
//********************************delete all Productss******************************************* */
const deleteAllproducts = async (req, res, next) => {
    try {
        const product = await objproductModel.deleteAllproducts();
        res.json({
            status: 'success',
            data: product,
            message: 'Products Deleted Successfully',
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteAllproducts = deleteAllproducts;
//********************************delete product********************************************* */
const deleteproduct = async (req, res, next) => {
    try {
        /*const id = req.params.id as unknown as string;
        console.log(id);
        if (!id) {
          res.status(400).send('Please, Insert The Required Param id! eg. :id.');
          return false;
        }*/
        const product = await objproductModel.delete(req.params.id);
        res.json({
            status: 'success',
            data: product,
            message: 'product Deleted Successfully',
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteproduct = deleteproduct;
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
