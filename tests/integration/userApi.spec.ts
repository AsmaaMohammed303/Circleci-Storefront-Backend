import supertest from 'supertest';
import server from '../../src/index';
import UserModel from '../../models/user.model';
import user from '../../types/user.type';
import jwt from 'jsonwebtoken';
const objUserModel = new UserModel();
const request = supertest(server);
import config from '../../middleware/config';

const user: user = {
  email: 'asmaa2023@hotmail.com',
  user_name: 'asmaa303',
  first_name: 'asmaa',
  last_name: 'mohammed',
  password: 'asmaa123',
  id: 'rer',
};

//const { user } = jwt.verify(token, SECRET);

afterAll(async () => {
  await objUserModel.deleteAllUsers();
});
//********************************Get specific User********************************************* */
describe('getSpecificUser', () => {
  //valid case
  it('should return 200 and get user from db', async () => {
    await objUserModel.create(user);
    const users = await objUserModel.getAllUsers();
    const res = await request
      .get(`/api/users/${users[0].id}`)
      .set(
        'Authorization',
        ('bearer ' + config.tokenSecret) as unknown as string
      );
    //const res = await request.get(`/api/users/${users[0].id}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toMatch('User Is Returned Successfully');
    expect((res.body.data.user.email = user.email));
  });
  //failed case
  it('should return 404 if not found', async () => {
    const res = await request
      .get('/api/users/123')
      .set(
        'Authorization',
        ('bearer ' + config.tokenSecret) as unknown as string
      );
    expect(res.status).toBe(404);
    expect(res.body.message).toMatch('404 not found');
  });
  it('should Insert The Required Param id', async () => {
    const res = await request
      .get('/api/users/')
      .set(
        'Authorization',
        ('bearer ' + config.tokenSecret) as unknown as string
      );
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(
      'Please, Insert The Required Param id! eg. :id.'
    );
  });
});
//********************************update User********************************************* */
describe('update', () => {
  it('should return 404 if not found', async () => {
    const res = await request
      .put('/api/users/123')
      .set(
        'Authorization',
        ('bearer ' + config.tokenSecret) as unknown as string
      );
    expect(res.status).toBe(404);
    expect(res.body.message).toMatch('404 not found');
  });
  it('should return 200 and update the user', async () => {
    const u = await objUserModel.create(user);

    const res = await request
      .put(`/api/users/${u.id}`)
      .set(
        'Authorization',
        ('bearer ' + config.tokenSecret) as unknown as string
      )
      .send({
        email: 'asmaa2023@hotmail.com',
        user_name: 'asmaa303',
        first_name: 'asmaa',
        last_name: 'mohammed',
        password: 'asmaa123',
      });
    //const res = await request.get(`/api/users/${users[0].id}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toMatch('User Updated Successfully');
    expect((res.body.data.user.email = user.email));
  });
  it('should Insert The Required Param id', async () => {
    const res = await request
      .put('/api/users/')
      .set(
        'Authorization',
        ('bearer ' + config.tokenSecret) as unknown as string
      );
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(
      'Please, Insert The Required Param id! eg. :id.'
    );
  });
});
//********************************delete User********************************************* */
describe('update', () => {
  it('should return 404 if not found', async () => {
    const res = await request
      .delete('/api/users/123')
      .set(
        'Authorization',
        ('bearer ' + config.tokenSecret) as unknown as string
      );
    expect(res.status).toBe(404);
    expect(res.body.message).toMatch('404 not found');
  });
  it('should Insert The Required Param id', async () => {
    const res = await request
      .delete('/api/users/')
      .set(
        'Authorization',
        ('bearer ' + config.tokenSecret) as unknown as string
      );
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(
      'Please, Insert The Required Param id! eg. :id.'
    );
  });
  it('should return 200 and delete the user', async () => {
    const u = await objUserModel.create(user);

    const res = await request
      .delete(`/api/users/${u.id}`)
      .set(
        'Authorization',
        ('bearer ' + config.tokenSecret) as unknown as string
      );
    expect(res.status).toBe(200);
    expect(res.body.message).toMatch('User Deleted Successfully');
    expect((res.body.data.user.email = user.email));
  });
});
