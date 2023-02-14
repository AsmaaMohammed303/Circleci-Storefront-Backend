import product from '../types/product.type';
import db from '../database/index';

class productModel {
  //--------------------create-----------------------------------------------------------
  async create(p: product): Promise<product> {
    try {
      //open connection
      const connection = await db.connect();
      //run query

      const sql =
        'insert into products (proName,price) values ($1,$2) returning proName,price';

      const result = connection.query(sql, [p.proName, p.price]);

      //close connection
      connection.release();

      //return product
      return (await result).rows[0];
    } catch (error) {
      throw new Error(`unable to create product ${(error as Error).message}`);
    }
  }

  //-------------------get all products-----------------------------------------
  async getAllproducts(): Promise<product[]> {
    try {
      const connection = await db.connect();
      const sql = 'select proName,price from products';
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`unable to get all product ${(error as Error).message}`);
    }
  }

  //---------------------get specific product-----------------------------------------------
  async getSpecificproduct(id: string): Promise<product> {
    try {
      const connection = await db.connect();
      const sql = ' select proName,price from products where id = ($1) ';
      const result = await connection.query(sql, [id]);
      return (await result).rows[0];
    } catch (error) {
      throw new Error(
        `unable to get specific product ${(error as Error).message}`
      );
    }
  }

  //--------------------------update product----------------------------------------------
  async update(p: product): Promise<product> {
    try {
      const connection = await db.connect();

      const sql =
        ' update products set proName = $1 ,price = $2 where id = ($3) returning proName,price ';
      const result = await connection.query(sql, [p.proName, p.price, p.id]);

      return (await result).rows[0];
    } catch (error) {
      throw new Error(
        `unable to get update product ${(error as Error).message}`
      );
    }
  }

  //--------------------------delete product---------------------------------------------
  async delete(id: string): Promise<product> {
    try {
      const connection = await db.connect();
      const sql = ' delete from products where id = ($1) ';
      const result = await connection.query(sql, [id]);
      return (await result).rows[0];
    } catch (error) {
      throw new Error(`unable to delete product ${(error as Error).message}`);
    }
  }
  //--------------------------delete all product---------------------------------------------
  async deleteAllproducts() {
    try {
      const connection = await db.connect();
      const sql = ' delete from products ';
      await connection.query(sql);
    } catch (error) {
      throw new Error(`unable to delete products ${(error as Error).message}`);
    }
  }
}

export default productModel;
