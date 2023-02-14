"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../../src/index"));
const product_model_1 = __importDefault(require("../../models/product.model"));
const objproductModel = new product_model_1.default();
const request = (0, supertest_1.default)(index_1.default);
const product = {
    proName: 'tomato',
    price: 30
};
let token = '';
afterAll(async () => {
    await objproductModel.deleteAllproducts();
});
describe('getAllproducts', () => {
    it('should return empty array', async () => {
        const products1 = await objproductModel.getAllproducts();
        expect(products1.length).toBe(0);
    });
    it('should return one products', async () => {
        await objproductModel.create(product);
        const products = await objproductModel.getAllproducts();
        expect(products.length).toBe(1);
        expect(products[0].proName).toBe(product.proName);
        expect(products[0].price).toBe(product.price);
    });
});
//********************************create product********************************************* */
describe('create', () => {
    it('should create product with first name asmaa', async () => {
        const products = await objproductModel.getAllproducts();
        expect(products.length).toBe(1);
        expect(products[0].proName).toBe(product.proName);
        expect(products[0].price).toBe(product.price);
    });
});
//********************************Get specific product********************************************* */
describe('getSpecificproduct', () => {
    //valid case
    it('should return 200 and get product from db', async () => {
        const products = await objproductModel.getAllproducts();
        const resAuthenticate = await request
            .post('/api/products/authenticate')
            .send({ proName: products[0].proName, price: product.price });
        token = resAuthenticate.body.data.token;
        const res = await request
            .get(`/api/products/getSpecificproduct/${products[0].id}`)
            .set('Authorization', ('bearer ' + token));
        expect(res.status).toBe(200);
        expect(res.body.message).toMatch('product Is Returned Successfully');
        //expect((res.body.data.proName = products[0].proName));
    });
    //failed case
    //***************************************question **********************************************
    //***************************************question **********************************************
    //in  expect(res.status).toBe(404); but 200
    //لو ما بعتش ال اي دي بيقول 404
    //وامتي 500
    it('product not found', async () => {
        const res = await request
            .get('/api/products/getSpecificproduct/6046bcf7-2f91-4dac-8443-b99ee9774203')
            .set('Authorization', ('bearer ' + token));
        expect(res.body.message).toMatch('product not found');
    });
    it('should Insert The Required Param id', async () => {
        const res = await request
            .get('/api/products/getSpecificproduct/')
            .set('Authorization', ('bearer ' + token));
        expect(res.status).toBe(404);
    });
});
//********************************update product********************************************* */
describe('update', () => {
    it('should return 404 if not found', async () => {
        const res = await request
            .patch('/api/products/getSpecificproduct/6046bcf7-2f91-4dac-8443-b99ee9774203')
            .set('Authorization', ('bearer ' + token));
        expect(res.status).toBe(404);
    });
    it('should return 200 and update the product', async () => {
        //await objproductModel.create(product);
        const products = await objproductModel.getAllproducts();
        const res = await request
            .patch(`/api/products/${products[0].id}`)
            .send({
            proName: 'banana',
            price: 30,
            id: products[0].id,
        })
            .set('Authorization', ('bearer ' + token));
        expect(res.status).toBe(200);
    });
});
//********************************delete product********************************************* */
describe('delete', () => {
    it('should return 404 if not found', async () => {
        const res = await request
            .patch('/api/products/getSpecificproduct/6046bcf7-2f91-4dac-8443-b99ee9774203')
            .set('Authorization', ('bearer ' + token));
        expect(res.status).toBe(404);
    });
    it('should return 200 and delete the product', async () => {
        //const u = await objproductModel.create(product);
        const products = await objproductModel.getAllproducts();
        const res = await request
            .delete(`/api/products/deleteSpecificproduct/${products[0].id}`)
            .set('Authorization', ('bearer ' + token));
        expect(res.status).toBe(200);
    });
});
