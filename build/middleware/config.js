"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
//عشان نقدر نستخدم ال environment variables
dotenv_1.default.config();
//عشان البروسيس بتاعة ال dotenv تبقا متوفره عندي
//console.log(process.env);
//كدا فهمنا ان ال environment دي موجوده في حاجه اسمها process.env
//فاحنا متاجين نعملها destructing
const { NODE_ENV, PORT, POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DB, POSTGRES_DB_TEST, POSTGRES_USER, POSTGRES_PASSWORD, BCRYPT_PASSWORD, SALT_ROUNDS, TOKEN_SECRET, } = process.env;
exports.default = {
    port: PORT,
    host: POSTGRES_HOST,
    dbPort: POSTGRES_PORT,
    database: NODE_ENV === 'dev' ? POSTGRES_DB : POSTGRES_DB_TEST,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    paper: BCRYPT_PASSWORD,
    salt: SALT_ROUNDS,
    tokenSecret: TOKEN_SECRET,
};
