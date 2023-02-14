"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../../src/index"));
const user_model_1 = __importDefault(require("../../models/user.model"));
const objUserModel = new user_model_1.default();
const request = (0, supertest_1.default)(index_1.default);
const config_1 = __importDefault(require("../../middleware/config"));
const user = {
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
describe('getSpecificUser', () => {
    it('should return 200 and get user from db', async () => {
        await objUserModel.create(user);
        const users = await objUserModel.getAllUsers();
        const res = await request
            .get(`/api/users/${users[0].id}`)
            .set('Authorization', ('bearer ' + config_1.default.tokenSecret));
        //const res = await request.get(`/api/users/${users[0].id}`);
        expect(res.status).toBe(200);
    });
});
