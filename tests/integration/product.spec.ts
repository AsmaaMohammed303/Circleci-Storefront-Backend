/*import supertest from 'supertest';
import server from '../../src/index';
import productModel from '../../models/product.model';
import product from '../../types/product.type';
import user from '../../types/user.type';
import UserModel from '../../models/user.model';
//import token from '../../tests/integration/user.spec'
const objproductModel = new productModel();
const request = supertest(server);
const objUserModel = new UserModel();

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

//let token = '';

afterAll(async () => {
  await objproductModel.deleteAllproducts();
  await objUserModel.deleteAllUsers();
});

//***************************************************************************** */
/*
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
/*
describe('getAllproducts', () => {
  it('should return empty array', async () => {
    const Allproducts = await objproductModel.getAllproducts();
    expect(Allproducts.length).toBe(0);
  });

  it('should return one products', async () => {
    await objproductModel.deleteAllproducts();
    await objproductModel.create(product);
    const Allproducts = await objproductModel.getAllproducts();
    expect(Allproducts.length).toBe(1);
    expect(Allproducts[0].price).toBe(product.price);
  });
});
//********************************create product********************************************* */
/*
describe('create', () => {
  it('should create product with proName tomato', async () => {
    const products = await objproductModel.getAllproducts();
    expect(products.length).toBe(1);
    expect(products[0].price).toBe(product.price);
  });
});

//********************************Get specific product********************************************* */
/*
describe('getSpecificproduct', () => {
  it('Test Method Is Exist', async () => {
    expect(objproductModel.getAllproducts).toBeDefined;
  });

  //valid case
  it('should return 200 and get product from db', async () => {
    const products = await objproductModel.getAllproducts();
    const users = await objUserModel.getAllUsers();
    const res = await request
      .get(`/api/products/getSpecificproduct/${products[0].id}`)
      //.set('Authorization', ('bearer ' + token) as unknown as string);
    expect(res.status).toBe(200);
    expect(res.body.message).toMatch('product Is Returned Successfully');
  });
  //failed case
  //***************************************question **********************************************
  //***************************************question **********************************************
  //in  expect(res.status).toBe(404); but 200
  //لو ما بعتش ال اي دي بيقول 404
  //وامتي 500
  it('product not found', async () => {
    const res = await request
      .get(
        '/api/products/getSpecificproduct/6046bcf7-2f91-4dac-8443-b99ee9774203'
      )
      //.set('Authorization', ('bearer ' + token) as unknown as string);
     // expect(res.body.message).toMatch('product not found');
  });

  it('should Insert The Required Param id', async () => {
    const res = await request
      .get('/api/products/getSpecificproduct/')
      //.set('Authorization', ('bearer ' + token) as unknown as string);
    //expect(res.status).toBe(404);
  });
});
//********************************update product********************************************* */
/*
describe('update', () => {
  it('should return 404 if not found', async () => {
    const res = await request
      .patch(
        '/api/products/getSpecificproduct/6046bcf7-2f91-4dac-8443-b99ee9774203'
      )
      .set('Authorization', ('bearer ' + token) as unknown as string);
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
      .set('Authorization', ('bearer ' + token) as unknown as string);
    expect(res.status).toBe(200);
  });
});
//********************************delete product********************************************* */
/*
describe('delete', () => {
  it('should return 404 if not found', async () => {
    const res = await request
      .patch(
        '/api/products/getSpecificproduct/6046bcf7-2f91-4dac-8443-b99ee9774203'
      )
      .set('Authorization', ('bearer ' + token) as unknown as string);
    expect(res.status).toBe(404);
  });

  it('should return 200 and delete the product', async () => {
    const products = await objproductModel.getAllproducts();
    const res = await request
      .delete(`/api/products/deleteSpecificproduct/${products[0].id}`)
      .set('Authorization', ('bearer ' + token) as unknown as string);
    expect(res.status).toBe(200);
  });
});

*/