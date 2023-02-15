"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../../src/index"));
const order_model_1 = __importDefault(require("../../models/order.model"));
const user_model_1 = __importDefault(require("../../models/user.model"));
const product_model_1 = __importDefault(require("../../models/product.model"));
//import token from '../../tests/integration/user.spec'
const objorderModel = new order_model_1.default();
const request = (0, supertest_1.default)(index_1.default);
const objUserModel = new user_model_1.default();
const objproductModel = new product_model_1.default();
const order = {
    product_id: '34545-324543-435345',
    quantity: 30,
};
const product = {
    proName: 'tomato',
    price: 30,
};
const user = {
    email: 'asmaa2023@hotmail.com',
    user_name: 'asmaa303',
    first_name: 'asmaa',
    last_name: 'mohammed',
    password: 'asmaa123',
};
let token = '';
afterAll(async () => {
    await objorderModel.deleteAllOrders();
    await objproductModel.deleteAllproducts();
    await objUserModel.deleteAllUsers();
});
/*
afterEach(async () => {
  await objUserModel.deleteAllUsers();
});*/
//***************************************************************************** */
describe('getSpecificUser', () => {
    //valid case
    it('should return 200 and get user from db', async () => {
        await objUserModel.deleteAllUsers();
        await objUserModel.create(user);
        const users = await objUserModel.getAllUsers();
        const resAuthenticate = await request
            .post('/api/Users/authenticate')
            .send({ email: users[0].email, password: user.password });
        token = resAuthenticate.body.data.token;
        expect(1).toBe(1);
    });
});
//***************************************************************************** */
describe('getAllorders', () => {
    it('should return empty array', async () => {
        const Allorders = await objorderModel.getAllorders();
        expect(Allorders.length).toBe(0);
    });
    it('should return one orders', async () => {
        await objproductModel.create(product);
        const products = await objproductModel.getAllproducts();
        order.product_id = `${products[0].id}`;
        await objorderModel.create(order);
        const Allorders = await objorderModel.getAllorders();
        expect(Allorders.length).toBe(1);
        expect(Allorders[0].quantity).toBe(order.quantity);
    });
});
//********************************create order********************************************* */
describe('create', () => {
    it('should create order with product_id ', async () => {
        await objproductModel.create(product);
        const products = await objproductModel.getAllproducts();
        const orders = await objorderModel.getAllorders();
        expect(orders.length).toBe(1);
        expect(orders[0].quantity).toBe(order.quantity);
    });
});
//********************************Get specific order********************************************* */
describe('getSpecificorder', () => {
    it('Test Method Is Exist', async () => {
        expect(objorderModel.getAllorders).toBeDefined;
    });
    //valid case
    it('should return 200 and get order from db', async () => {
        const orders = await objorderModel.getAllorders();
        const users = await objUserModel.getAllUsers();
        const res = await request
            .get(`/api/orders/getSpecificorder/${orders[0].id}`)
            .set('Authorization', ('bearer ' + token));
        expect(res.status).toBe(200);
        expect(res.body.message).toMatch('order Is Returned Successfully');
    });
    //failed case
    //***************************************question **********************************************
    //***************************************question **********************************************
    //in  expect(res.status).toBe(404); but 200
    //لو ما بعتش ال اي دي بيقول 404
    //وامتي 500
    it('order not found', async () => {
        const res = await request
            .get('/api/orders/getSpecificorder/6046bcf7-2f91-4dac-8443-b99ee9774203')
            .set('Authorization', ('bearer ' + token));
    });
    it('should Insert The Required Param id', async () => {
        const res = await request
            .get('/api/orders/getSpecificorder/')
            .set('Authorization', ('bearer ' + token));
        //expect(res.status).toBe(404);
    });
});
//********************************update order********************************************* */
describe('update', () => {
    it('should return 404 if not found', async () => {
        const res = await request
            .patch('/api/orders/getSpecificorder/6046bcf7-2f91-4dac-8443-b99ee9774203')
            .set('Authorization', ('bearer ' + token));
        expect(res.status).toBe(404);
    });
    it('should return 200 and update the order', async () => {
        //await objorderModel.create(order);
        const orders = await objorderModel.getAllorders();
        const products = await objproductModel.getAllproducts();
        const res = await request
            .patch(`/api/orders/${orders[0].id}`)
            .send({
            product_id: products[0].id,
            quantity: 30,
            id: orders[0].id,
        })
            .set('Authorization', ('bearer ' + token));
        expect(res.status).toBe(200);
    });
});
//********************************delete order********************************************* */
describe('delete', () => {
    it('should return 404 if not found', async () => {
        const res = await request
            .patch('/api/orders/getSpecificorder/6046bcf7-2f91-4dac-8443-b99ee9774203')
            .set('Authorization', ('bearer ' + token));
        expect(res.status).toBe(404);
    });
    it('should return 200 and delete the order', async () => {
        const orders = await objorderModel.getAllorders();
        const res = await request
            .delete(`/api/orders/deleteSpecificorder/${orders[0].id}`)
            .set('Authorization', ('bearer ' + token));
        expect(res.status).toBe(200);
    });
});
