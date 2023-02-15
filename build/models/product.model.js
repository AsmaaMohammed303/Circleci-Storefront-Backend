"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../database/index"));
const config_1 = __importDefault(require("../middleware/config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class productModel {
    //--------------------create-----------------------------------------------------------
    async create(p) {
        try {
            //open connection
            const connection = await index_1.default.connect();
            //run query
            const sql = 'insert into products (proName,price) values ($1,$2) returning proName,price';
            const result = connection.query(sql, [p.proName, p.price]);
            //close connection
            connection.release();
            //return product
            return (await result).rows[0];
        }
        catch (error) {
            throw new Error(`unable to create product ${error.message}`);
        }
    }
    //-------------------get all products-----------------------------------------
    async getAllproducts() {
        try {
            const connection = await index_1.default.connect();
            const sql = 'select proName,price,id from products';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`unable to get all product ${error.message}`);
        }
    }
    //---------------------get specific product-----------------------------------------------
    async getSpecificproduct(id) {
        try {
            const connection = await index_1.default.connect();
            const sql = ' select proName,price from products where id = ($1) ';
            const result = await connection.query(sql, [id]);
            return (await result).rows[0];
        }
        catch (error) {
            throw new Error(`unable to get specific product ${error.message}`);
        }
    }
    //--------------------------update product----------------------------------------------
    async update(p) {
        try {
            const connection = await index_1.default.connect();
            const sql = ' update products set proName = $1 ,price = $2 where id = ($3) returning proName,price ';
            const result = await connection.query(sql, [p.proName, p.price, p.id]);
            return (await result).rows[0];
        }
        catch (error) {
            throw new Error(`unable to get update product ${error.message}`);
        }
    }
    //--------------------------delete product---------------------------------------------
    async delete(id) {
        try {
            const connection = await index_1.default.connect();
            const sql = ' delete from products where id = ($1) ';
            const result = await connection.query(sql, [id]);
            return (await result).rows[0];
        }
        catch (error) {
            throw new Error(`unable to delete product ${error.message}`);
        }
    }
    //--------------------------delete all product---------------------------------------------
    async deleteAllproducts() {
        try {
            const connection = await index_1.default.connect();
            const sql = ' delete from products ';
            await connection.query(sql);
        }
        catch (error) {
            throw new Error(`unable to delete products ${error.message}`);
        }
    }
    //--------------------------Authenticate User---------------------------------------------
    //authentication
    async authenticateUser(email, password) {
        try {
            const connection = await index_1.default.connect();
            //محتاجين نعمل validate الاول ان الايميل و الباسورد مبعوتين ولا لا
            const sql = 'select password from users where email = $1';
            const result = await connection.query(sql, [email]);
            if ((await result).rows.length) {
                const { password: hashpassword } = result.rows[0];
                const isPasswordValid = await bcrypt_1.default.compareSync(`${password}${config_1.default.paper}`, hashpassword);
                if (isPasswordValid) {
                    const userInfo = connection.query('select id,email,user_name,first_name,last_name from users where email = ($1)', [email]);
                    return (await userInfo).rows[0];
                }
            }
            connection.release;
            return null;
        }
        catch (error) {
            throw new Error(`unable to delete user ${error.message}`);
        }
    }
}
exports.default = productModel;
