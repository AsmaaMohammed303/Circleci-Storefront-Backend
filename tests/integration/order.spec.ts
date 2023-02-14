import supertest from 'supertest';
import server from '../../src/index';
import orderModel from '../../models/order.model';
import order from '../../types/order.type';
const objorderModel = new orderModel();
const request = supertest(server);

const order: order = {
    product_id: '123',
    quantity: 30
};

let token = '';
afterAll(async () => {
  await objorderModel.deleteAllOrders();
});

describe('getAllorders', () => {
  it('should return empty array', async () => {
    const orders1 = await objorderModel.getAllorders();
    expect(orders1.length).toBe(0);
  });

  it('should return one orders', async () => {
    await objorderModel.create(order);
    const orders = await objorderModel.getAllorders();
    expect(orders.length).toBe(1);
    expect(orders[0].product_id).toBe(order.product_id);
    expect(orders[0].quantity).toBe(order.quantity);
  });
});

//********************************create order********************************************* */
describe('create', () => {
  it('should create order with first name asmaa', async () => {
    const orders = await objorderModel.getAllorders();
    expect(orders.length).toBe(1);
    expect(orders[0].product_id).toBe(order.product_id);
    expect(orders[0].quantity).toBe(order.quantity);
  });
});

//********************************Get specific order********************************************* */

describe('getSpecificorder', () => {
  //valid case
  it('should return 200 and get order from db', async () => {
    const orders = await objorderModel.getAllorders();

    const resAuthenticate = await request
      .post('/api/orders/authenticate')
      .send({ product_id: orders[0].product_id, quantity: order.quantity });

    token = resAuthenticate.body.data.token;

    const res = await request
      .get(`/api/orders/getSpecificorder/${orders[0].id}`)
      .set('Authorization', ('bearer ' + token) as unknown as string);

    expect(res.status).toBe(200);
    expect(res.body.message).toMatch('order Is Returned Successfully');
    //expect((res.body.data.product_id = orders[0].product_id));
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
    expect(res.body.message).toMatch('order not found');
  });

  it('should Insert The Required Param id', async () => {
    const res = await request
      .get('/api/orders/getSpecificorder/')
      .set('Authorization', ('bearer ' + token) as unknown as string);
    expect(res.status).toBe(404);
  });
});
//********************************update order********************************************* */
describe('update', () => {
  it('should return 404 if not found', async () => {
    const res = await request
      .patch('/api/orders/getSpecificorder/6046bcf7-2f91-4dac-8443-b99ee9774203')
      .set('Authorization', ('bearer ' + token) as unknown as string);
    expect(res.status).toBe(404);
  });
  it('should return 200 and update the order', async () => {
    //await objorderModel.create(order);
    const orders = await objorderModel.getAllorders();
    const res = await request
      .patch(`/api/orders/${orders[0].id}`)
      .send({
        product_id: 'banana',
        quantity: 30 ,
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
      .patch('/api/orders/getSpecificorder/6046bcf7-2f91-4dac-8443-b99ee9774203')
      .set('Authorization', ('bearer ' + token) as unknown as string);
    expect(res.status).toBe(404);
  });

  it('should return 200 and delete the order', async () => {
    //const u = await objorderModel.create(order);
    const orders = await objorderModel.getAllorders();
    const res = await request
      .delete(`/api/orders/deleteSpecificorder/${orders[0].id}`)
      .set('Authorization', ('bearer ' + token) as unknown as string);
    expect(res.status).toBe(200);
  });
});
