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
const controllers = __importStar(require("../../controllers/orders.controllers"));
const authentcation_middleware_1 = __importDefault(require("../../middleware/authentcation.middleware"));
const routes = (0, express_1.Router)();
// / ===> api/orders
routes
    .route('/')
    .get(authentcation_middleware_1.default, controllers.getAllorders)
    .post(controllers.createorder)
    .delete(authentcation_middleware_1.default, controllers.deleteAllOrders);
routes
    .route('/getSpecificorder/:id')
    .get(authentcation_middleware_1.default, controllers.getSpecificorder);
routes
    .route('/:id')
    .patch(authentcation_middleware_1.default, controllers.updateorder);
routes
    .route('/deleteSpecificorder/:id')
    .delete(authentcation_middleware_1.default, controllers.deleteorder);
/*
routes
.route('/')
.get(controllers.getAllorders)
.post(authenticationMiddlware, controllers.createorder);
routes
.route('/:id')
.get(controllers.getSpecificorder)
.patch(authenticationMiddlware, controllers.updateorder)
.delete(authenticationMiddlware, controllers.deleteorder);
*/
//routes.route('/authenticate').post(controllers.authenticate);
//routes.post('/',controllers.create);
exports.default = routes;
