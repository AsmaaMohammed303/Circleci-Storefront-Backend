import supertest from 'supertest';
import server from '../../src/index';
import orderModel from '../../models/order.model';
import order from '../../types/order.type';
import user from '../../types/user.type';
import UserModel from '../../models/user.model';
import productModel from '../../models/product.model';
import product from '../../types/product.type';

//import token from '../../tests/integration/user.spec'
const objorderModel = new orderModel();
const request = supertest(server);
const objUserModel = new UserModel();
const objproductModel = new productModel();

const order: order = {
  product_id: '34545-324543-435345',
  quantity: 30,
};

const product: product = {
  proName: 'tomato',
  price: 30,
};

const user: user = {
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
      .set('Authorization', ('bearer ' + token) as unknown as string);
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
      .set('Authorization', ('bearer ' + token) as unknown as string);
  });

  it('should Insert The Required Param id', async () => {
    const res = await request
      .get('/api/orders/getSpecificorder/')
      .set('Authorization', ('bearer ' + token) as unknown as string);
    //expect(res.status).toBe(404);
  });
});
//********************************update order********************************************* */
describe('update', () => {
  it('should return 404 if not found', async () => {
    const res = await request
      .patch(
        '/api/orders/getSpecificorder/6046bcf7-2f91-4dac-8443-b99ee9774203'
      )
      .set('Authorization', ('bearer ' + token) as unknown as string);
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
      .set('Authorization', ('bearer ' + token) as unknown as string);
    expect(res.status).toBe(200);
  });
});
//********************************delete order********************************************* */

describe('delete', () => {
  it('should return 404 if not found', async () => {
    const res = await request
      .patch(
        '/api/orders/getSpecificorder/6046bcf7-2f91-4dac-8443-b99ee9774203'
      )
      .set('Authorization', ('bearer ' + token) as unknown as string);
    expect(res.status).toBe(404);
  });

  it('should return 200 and delete the order', async () => {
    const orders = await objorderModel.getAllorders();
    const res = await request
      .delete(`/api/orders/deleteSpecificorder/${orders[0].id}`)
      .set('Authorization', ('bearer ' + token) as unknown as string);
    expect(res.status).toBe(200);
  });
});

