import order from '../types/order.type';
import db from '../database/index';
import user from '../types/user.type';
import config from '../middleware/config';
import bcrypt from 'bcrypt';
class orderModel {
  //--------------------create-----------------------------------------------------------
  async create(o: order): Promise<order> {
    try {
      //open connection
      const connection = await db.connect();
      //run query

      const sql =
        'insert into orders (product_id,quantity) values ($1,$2) returning product_id,quantity';

      const result = connection.query(sql, [o.product_id, o.quantity]);

      //close connection
      connection.release();

      //return order
      return (await result).rows[0];
    } catch (error) {
      throw new Error(`unable to create order ${(error as Error).message}`);
    }
  }

  //-------------------get all orders-----------------------------------------
  async getAllorders(): Promise<order[]> {
    try {
      const connection = await db.connect();
      const sql = 'select product_id,quantity,id from orders';
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`unable to get all order ${(error as Error).message}`);
    }
  }

  //---------------------get specific order-----------------------------------------------
  async getSpecificorder(id: string): Promise<order> {
    try {
      const connection = await db.connect();
      const sql = ' select product_id,quantity from orders where id = ($1) ';
      const result = await connection.query(sql, [id]);
      return (await result).rows[0];
    } catch (error) {
      throw new Error(
        `unable to get specific order ${(error as Error).message}`
      );
    }
  }

  //--------------------------update order----------------------------------------------
  async update(o: order): Promise<order> {
    try {
      const connection = await db.connect();

      const sql =
        ' update orders set product_id = $1 ,quantity = $2 where id = ($3) returning product_id,quantity ';
      const result = await connection.query(sql, [
        o.product_id,
        o.quantity,
        o.id,
      ]);

      return (await result).rows[0];
    } catch (error) {
      throw new Error(`unable to get update order ${(error as Error).message}`);
    }
  }

  //--------------------------delete order---------------------------------------------
  async delete(id: string): Promise<order> {
    try {
      const connection = await db.connect();
      const sql = ' delete from orders where id = ($1) ';
      const result = await connection.query(sql, [id]);
      return (await result).rows[0];
    } catch (error) {
      throw new Error(`unable to delete order ${(error as Error).message}`);
    }
  }

    //--------------------------delete all order---------------------------------------------
    async deleteAllOrders() {
      try {
        const connection = await db.connect();
        const sql = ' delete from orders ';
        await connection.query(sql);
      } catch (error) {
        throw new Error(`unable to delete orders ${(error as Error).message}`);
      }
    }
  //--------------------------Authenticate User---------------------------------------------
    //authentication
    async authenticateUser(
      email: string,
      password: string
    ): Promise<user | null> {
      try {
        const connection = await db.connect();
        //محتاجين نعمل validate الاول ان الايميل و الباسورد مبعوتين ولا لا
        const sql = 'select password from users where email = $1';
        const result = await connection.query(sql, [email]);
        if ((await result).rows.length) {
          const { password: hashpassword } = result.rows[0];
  
          const isPasswordValid = await bcrypt.compareSync(
            `${password}${config.paper}`,
            hashpassword
          );
  
          if (isPasswordValid) {
            const userInfo = connection.query(
              'select id,email,user_name,first_name,last_name from users where email = ($1)',
              [email]
            );
            return (await userInfo).rows[0];
          }
        }
        connection.release;
        return null;
      } catch (error) {
        throw new Error(`unable to delete user ${(error as Error).message}`);
      }
    }
}
export default orderModel;
