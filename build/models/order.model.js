"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../database/index"));
const config_1 = __importDefault(require("../middleware/config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class orderModel {
    //--------------------create-----------------------------------------------------------
    async create(o) {
        try {
            //open connection
            const connection = await index_1.default.connect();
            //run query
            const sql = 'insert into orders (product_id,quantity) values ($1,$2) returning product_id,quantity';
            const result = connection.query(sql, [o.product_id, o.quantity]);
            //close connection
            connection.release();
            //return order
            return (await result).rows[0];
        }
        catch (error) {
            throw new Error(`unable to create order ${error.message}`);
        }
    }
    //-------------------get all orders-----------------------------------------
    async getAllorders() {
        try {
            const connection = await index_1.default.connect();
            const sql = 'select product_id,quantity,id from orders';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`unable to get all order ${error.message}`);
        }
    }
    //---------------------get specific order-----------------------------------------------
    async getSpecificorder(id) {
        try {
            const connection = await index_1.default.connect();
            const sql = ' select product_id,quantity from orders where id = ($1) ';
            const result = await connection.query(sql, [id]);
            return (await result).rows[0];
        }
        catch (error) {
            throw new Error(`unable to get specific order ${error.message}`);
        }
    }
    //--------------------------update order----------------------------------------------
    async update(o) {
        try {
            const connection = await index_1.default.connect();
            const sql = ' update orders set product_id = $1 ,quantity = $2 where id = ($3) returning product_id,quantity ';
            const result = await connection.query(sql, [
                o.product_id,
                o.quantity,
                o.id,
            ]);
            return (await result).rows[0];
        }
        catch (error) {
            throw new Error(`unable to get update order ${error.message}`);
        }
    }
    //--------------------------delete order---------------------------------------------
    async delete(id) {
        try {
            const connection = await index_1.default.connect();
            const sql = ' delete from orders where id = ($1) ';
            const result = await connection.query(sql, [id]);
            return (await result).rows[0];
        }
        catch (error) {
            throw new Error(`unable to delete order ${error.message}`);
        }
    }
    //--------------------------delete all order---------------------------------------------
    async deleteAllOrders() {
        try {
            const connection = await index_1.default.connect();
            const sql = ' delete from orders ';
            await connection.query(sql);
        }
        catch (error) {
            throw new Error(`unable to delete orders ${error.message}`);
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
exports.default = orderModel;
