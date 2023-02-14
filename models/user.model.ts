import user from '../types/user.type';
import db from '../database/index';
import config from '../middleware/config';
import bcrypt from 'bcrypt';

const hashpassword = (password: string) => {
  const salt = parseInt(config.salt as string, 10);
  return bcrypt.hashSync(`${password}${config.paper}`, salt);
};

class UserModel {
  async create(u: user): Promise<user> {
    try {
      //open connection
      const connection = await db.connect();
      //run query

      const sql =
        'insert into users (email,user_name,first_name,last_name,password) values ($1,$2,$3,$4,$5) returning email,user_name,first_name,last_name';

      const result = connection.query(sql, [
        u.email,
        u.user_name,
        u.first_name,
        u.last_name,
        hashpassword(u.password),
      ]);

      //close connection
      connection.release();

      //return user
      return (await result).rows[0];
    } catch (error) {
      throw new Error(`unable to create user ${(error as Error).message}`);
    }
  }

  //get all users
  async getAllUsers(): Promise<user[]> {
    try {
      const connection = await db.connect();
      const sql = 'select email,user_name,first_name,last_name,id from users';
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`unable to get all user ${(error as Error).message}`);
    }
  }

  //get specific user
  async getSpecificUser(id: string): Promise<user> {
    try {
      const connection = await db.connect();
      const sql =
        ' select email,user_name,first_name,last_name from users where id = ($1) ';
      const result = await connection.query(sql, [id]);
      return (await result).rows[0];
    } catch (error) {
      throw new Error(
        `unable to get specific user ${(error as Error).message}`
      );
    }
  }

  //update user
  async update(u: user): Promise<user> {
    try {
      const connection = await db.connect();

      const sql =
        ' update users set email = $1 ,user_name = $2 ,first_name = $3,last_name = $4, password = $5 where id = ($6) returning email,user_name,first_name,last_name ';
      const result = await connection.query(sql, [
        u.email,
        u.user_name,
        u.first_name,
        u.last_name,
        hashpassword(u.password),
        u.id,
      ]);

      return (await result).rows[0];
    } catch (error) {
      throw new Error(`unable to get update user ${(error as Error).message}`);
    }
  }

  //delete user
  async delete(id: string): Promise<user> {
    try {
      const connection = await db.connect();
      const sql = ' delete from users where id = ($1) ';
      const result = await connection.query(sql, [id]);
      return (await result).rows[0];
    } catch (error) {
      throw new Error(`unable to delete user ${(error as Error).message}`);
    }
  }

  //delete all user
  async deleteAllUsers() {
    try {
      const connection = await db.connect();
      const sql = ' delete from users ';
      await connection.query(sql);
    } catch (error) {
      throw new Error(`unable to delete users ${(error as Error).message}`);
    }
  }

  /*
  async authenticateUser(
    email: string,
    password: string
  ): Promise<user | null> {
    //try {
    const salt =await bcrypt.genSaltSync();

    const hashh =await bcrypt.hash('123', 10);

    const result = await bcrypt.compare('123', hashh);
    console.log(result);

    return null;
  }
}*/

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

export default UserModel;
