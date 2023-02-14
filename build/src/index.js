"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("../database/index"));
const config_1 = __importDefault(require("../middleware/config"));
const routes_1 = __importDefault(require("../routes"));
//application ==> عشان احنا بنستخدم ال typescript
//وممكن ما نستخدمهوش
//, { application }
//create instance of server
console.log(config_1.default);
const app = (0, express_1.default)();
const port = config_1.default.port || 3000;
/*
const _db = new Client({
  ssl: false,
  host: 'localhost',
  port: 5432,
  database: 'store_dev',
  user: 'postgres',
  password: 'the#1s',
});*/
//create instance
app.use(express_1.default.json()); //عشان اخليه يقدر يقري بارمترات الجاسون من البوست مان
app.use('/api', routes_1.default);
//test database
index_1.default.connect().then((client) => {
    return client
        .query('select NOW()')
        .then((res) => {
        client.release();
        console.log(res.rows[0].now);
    })
        .catch((err) => {
        // Make sure to release the client before any error handling,
        // just in case the error handling itself throws an error.
        client.release();
        console.log(err.stack);
    });
});
//start express server
//ممكن نقوله ابعتلي callback فانكشن بيحصلها لما السيرفر يشتغل
app.listen(port, () => {
    console.log(`server is run at port ${port}`);
});
exports.default = app;
