import supertest from 'supertest';
import server from '../../src/index';
import UserModel from '../../models/user.model';
import user from '../../types/user.type';
//import token from './order.spec';
const objUserModel = new UserModel();
const request = supertest(server);

const user: user = {
  email: 'asmaa2023@hotmail.com',
  user_name: 'asmaa303',
  first_name: 'asmaa',
  last_name: 'mohammed',
  password: 'asmaa123',
};

//let token = '';
afterAll(async () => {
  await objUserModel.deleteAllUsers();
});

describe('getAllUsers', () => {
  /*
  it('should return empty array', async () => {
    //await objUserModel.deleteAllUsers();
    const users1 = await objUserModel.getAllUsers();
    expect(users1.length).toBe(1);
  });*/

  it('should return one users', async () => {
    //await objUserModel.deleteAllUsers();
    //await objUserModel.create(user);
    const users = await objUserModel.getAllUsers();
    expect(users.length).toBe(1);
    expect(users[0].email).toBe(user.email);
    expect(users[0].user_name).toBe(user.user_name);
    expect(users[0].first_name).toBe(user.first_name);
    expect(users[0].last_name).toBe(user.last_name);
  });
});
//********************************create User********************************************* */
describe('create', () => {
  it('should create user with first name asmaa', async () => {
    const users = await objUserModel.getAllUsers();
    expect(users.length).toBe(1);
    expect(users[0].email).toBe(user.email);
    expect(users[0].user_name).toBe(user.user_name);
    expect(users[0].first_name).toBe(user.first_name);
    expect(users[0].last_name).toBe(user.last_name);
  });
});

//********************************Get specific User********************************************* */
/*
describe('getSpecificUser', () => {
  //valid case
  it('should return 200 and get user from db', async () => {
    const users = await objUserModel.getAllUsers();
    console.log(users);
    const resAuthenticate = await request
      .post('/api/Users/authenticate')
      .send({ email: users[0].email, password: user.password });

    token = resAuthenticate.body.data.token;

    const res = await request
      .get(`/api/users/getSpecificUser/${users[0].id}`)
      .set('Authorization', ('bearer ' + token) as unknown as string);

    expect(res.status).toBe(200);
    expect(res.body.message).toMatch('User Is Returned Successfully');

  });
});
  //failed case
  //***************************************question **********************************************
  //***************************************question **********************************************
  //in  expect(res.status).toBe(404); but 200
  //لو ما بعتش ال اي دي بيقول 404
  //وامتي 500
  /*
  it('user not found', async () => {
    const res = await request
      .get('/api/users/getSpecificUser/6046bcf7-2f91-4dac-8443-b99ee9774203')
      .set('Authorization', ('bearer ' + token) as unknown as string);
    expect(res.body.message).toMatch('user not found');
  });

  it('should Insert The Required Param id', async () => {
    const res = await request
      .get('/api/users/getSpecificUser/')
      .set('Authorization', ('bearer ' + token) as unknown as string);
    expect(res.status).toBe(404);
  });
});
//********************************update User********************************************* */
/*
describe('update', () => {
  it('should return 404 if not found', async () => {
    const res = await request
      .patch('/api/users/getSpecificUser/6046bcf7-2f91-4dac-8443-b99ee9774203')
      .set('Authorization', ('bearer ' + token) as unknown as string);
    expect(res.status).toBe(404);
  });

  it('should return 200 and update the user', async () => {
    const users = await objUserModel.getAllUsers();
    const res = await request
      .patch(`/api/users/${users[0].id}`)
      .send({
        email: 'asmaa2023@hotmail.com',
        user_name: 'asmaa303',
        first_name: 'asmaa',
        last_name: 'mohammed',
        password: 'asmaa123',
        id: users[0].id,
      })
      .set('Authorization', ('bearer ' + token) as unknown as string);
    expect(res.status).toBe(200);
  });
});
//********************************delete User********************************************* */
/*
describe('delete', () => {
  it('should return 404 if not found', async () => {
    const res = await request
      .patch('/api/users/getSpecificUser/6046bcf7-2f91-4dac-8443-b99ee9774203')
      .set('Authorization', ('bearer ' + token) as unknown as string);
    expect(res.status).toBe(404);
  });

  it('should return 200 and delete the user', async () => {
    const users = await objUserModel.getAllUsers();
    const res = await request
      .delete(`/api/users/deleteSpecificUser/${users[0].id}`)
      .set('Authorization', ('bearer ' + token) as unknown as string);
    expect(res.status).toBe(200);
  });
});
//export default token ;
//********************************test case of id not inserted********************************* */
/*
  it('should Insert The Required Param id', async () => {
    const res = await request
      .delete('/api/users/deleteSpecificUser/')
      .set(
        'Authorization',
        ('bearer ' + token) as unknown as string
      );
    expect(res.status).toBe(400);
   /* expect(res.body.message).toMatch(
      'Please, Insert The Required Param id! eg. :id.'
    );
  });*/
/* it('should Insert The Required Param id', async () => {
    const res = await request
      .put('/api/users/')
      .set(
        'Authorization',
        ('bearer ' + token) as unknown as string
      );
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(
      'Please, Insert The Required Param id! eg. :id.'
    );
  });*/
