"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers = __importStar(require("../../controllers/users.controllers"));
const authentcation_middleware_1 = __importDefault(require("../../middleware/authentcation.middleware"));
const routes = (0, express_1.Router)();
// / ===> api/users
routes
    .route('/')
    .get(authentcation_middleware_1.default, controllers.getAllUsers)
    .post(controllers.createUser)
    .delete(authentcation_middleware_1.default, controllers.deleteAllUsers);
routes
    .route('/getSpecificUser/:id')
    .get(authentcation_middleware_1.default, controllers.getSpecificUser);
routes
    .route('/:id')
    .patch(authentcation_middleware_1.default, controllers.updateUser);
routes
    .route('/deleteSpecificUser/:id')
    .delete(authentcation_middleware_1.default, controllers.deleteUser);
routes.route('/authenticate').post(controllers.authenticate);
//routes.post('/',controllers.create);
exports.default = routes;
