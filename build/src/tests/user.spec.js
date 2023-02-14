"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const config_1 = __importDefault(require("../../middleware/config"));
const user_model_1 = __importDefault(require("../../models/user.model"));
const request = (0, supertest_1.default)(index_1.default);
const Secret = config_1.default.tokenSecret;
const objUserModel = new user_model_1.default();
describe('getAllUsers', () => {
    it('should return empty array', () => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield objUserModel.getAllUsers();
        expect(users.length).toBe(0);
    }));
    it('should return 2 users', () => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield objUserModel.getAllUsers();
        expect(users.length).toBe(2);
    }));
});
/*
describe('Test User', () => {
  const userData: userModel = {
    email: 'asmaa2023@gmail.com',
    user_name: 'asmaa303',
    first_name: 'asmaa',
    last_name: 'mohammed',
    password: 'asmaa+123',
    id: '123321',
  };

  let token: string,
    userId = 1;

  it('should gets the create endpoint', async (done) => {
    const res = await request.post('/users/create').send(userData);

    const { body, status } = res;
    token = body;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { user } = jwt.verify(token, SECRET);
    userId = user.id;

    expect(status).toBe(200);
    done();
  });

  it('should gets the index endpoint', async (done) => {
    const res = await request
      .get('/users')
      .set('Authorization', 'bearer ' + token);

    expect(res.status).toBe(200);
    done();
  });

  it('should get the read endpoint', async (done) => {
    const res = await request
      .get(`/users/${userId}`)
      .set('Authorization', 'bearer ' + token);

    expect(res.status).toBe(200);
    done();
  });

  it('should get the update endpoint', async (done) => {
    const newUserData: userModel = {
      ...userData,
      firstname: 'Chris',
      lastname: 'Anne',
    };

    const res = await request
      .put(`/users/${userId}`)
      .send(newUserData)
      .set('Authorization', 'bearer ' + token);

    expect(res.status).toBe(200);
    done();
  });

  it('should get the auth endpoint', async (done) => {
    const res = await request
      .post('/users/authenticate')
      .send({
        username: userData.username,
        password: userData.password,
      })
      .set('Authorization', 'bearer ' + token);

    expect(res.status).toBe(200);
    done();
  });

  it('should get the auth endpoint with wrong password', async (done) => {
    const res = await request
      .post('/users/authenticate')
      .send({
        username: userData.username,
        password: 'trtdtxcfcf',
      })
      .set('Authorization', 'bearer ' + token);

    expect(res.status).toBe(401);
    done();
  });

  it('should get the delete endpoint', async (done) => {
    const res = await request
      .delete(`/users/${userId}`)
      .set('Authorization', 'bearer ' + token);
    expect(res.status).toBe(200);
    done();
  });
});
*/ 
