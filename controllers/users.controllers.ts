import { NextFunction, Request, Response } from 'express';
//import { request } from 'http';
import userModel from '../models/user.model';
import jwt from 'jsonwebtoken';
//import { config } from 'dotenv';
import cconfig from '../middleware/config';
//create instaance from class usermodel
const objUserModel = new userModel();
let token = '';
//************************************* create *********************************************** */
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const first_name = req.body.first_name as unknown as string;
    const last_name = req.body.last_name as unknown as string;
    const user_name = req.body.user_name as unknown as string;
    const password = req.body.password as unknown as string;
    const email = req.body.email as unknown as string;
    if (!first_name || !last_name || !user_name || !password || !email) {
      res.status(400);
      res.send(
        'Please Insert The Correct Params! eg. :first_name, :last_name, :user_name, :password , :email'
      );
      return false;
    }

    //console.log(req.body);
    const user = await objUserModel.create(req.body);

    res.json({
      status: 'sucess',
      data: { ...user },
      message: 'user created sucessfully',
    });
  } catch (error) {
    //عشان عاملين error handling
    next(error);
  }
};
//********************************Get All User********************************************* */
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //console.log(req.body);
    const users = await objUserModel.getAllUsers();
    res.json({
      status: 'success',
      data: jwt.sign({ users }, cconfig.tokenSecret as unknown as string),
      message: 'All Users Returned Successfully',
    });
  } catch (error) {
    next(error);
  }
};
//********************************Get specific User********************************************* */
export const getSpecificUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id as unknown as string;
    /*
    if (!id) {
      console.log('here');
      res.json({
        status: 400,
        data: '', //jwt.sign({ user }, cconfig.tokenSecret as unknown as string),
        message: 'Please, Insert The Required Param id! eg. :id.',
      });
      return res;
    }
*/
    //console.log(req.body);
    const userEXist = await objUserModel.getSpecificUser(
      req.params.id as unknown as string
    );
    if (!userEXist) {
      res.json({
        status: 404,
        data: userEXist, //jwt.sign({ user }, cconfig.tokenSecret as unknown as string),
        message: 'user not found',
      });
      return res;
    }

    res.json({
      status: 'success',
      data: '', //jwt.sign({ user }, cconfig.tokenSecret as unknown as string),
      message: 'User Is Returned Successfully',
    });
  } catch (error) {
    next(error);
  }
};
//********************************update User********************************************* */
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const first_name = req.body.first_name as unknown as string;
    const last_name = req.body.last_name as unknown as string;
    const user_name = req.body.user_name as unknown as string;
    const password = req.body.password as unknown as string;
    const email = req.body.email as unknown as string;
    const id = req.body.id as unknown as string;
    /*
    if (!id) {
      res.status(400).send('Please, Insert The Required Param id! eg. :id.');
      return false;
    }
*/
    const userEXist = await objUserModel.getSpecificUser(
      req.params.id as unknown as string
    );
    if (!userEXist) {
      res.json({
        status: 404,
        data: userEXist, //jwt.sign({ user }, cconfig.tokenSecret as unknown as string),
        message: 'user not found',
      });
      return res;
    }

    if (!first_name || !last_name || !user_name || !password || !email) {
      res.status(400);
      res.send(
        'Please Insert The Correct Params! eg. :first_name, :last_name, :user_name, :password , :email '
      );
      return false;
    }
    //محتاجين نعمل express validator عشان نتأكد ان الداتا راجعه صح
    const user = await objUserModel.update(req.body);
    res.json({
      status: 'success',
      data: user,
      message: 'User Updated Successfully',
    });
  } catch (error) {
    next(error);
  }
};
//********************************delete User********************************************* */
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    /*
    const id = req.params.id as unknown as string;
   
    if (!id) {
      res.status(400).send('Please, Insert The Required Param id! eg. :id.');
      return false;
    }
*/
    const userEXist = await objUserModel.getSpecificUser(
      req.params.id as unknown as string
    );
    if (!userEXist) {
      res.json({
        status: 404,
        data: userEXist, //jwt.sign({ user }, cconfig.tokenSecret as unknown as string),
        message: 'user not found',
      });
      return res;
    }

    const user = await objUserModel.delete(req.params.id as unknown as string);
    res.json({
      status: 'success',
      data: user,
      message: 'User Deleted Successfully',
    });
  } catch (error) {
    next(error);
  }
};
//********************************delete all Users******************************************* */
export const deleteAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await objUserModel.deleteAllUsers();
    res.json({
      status: 'success',
      data: user,
      message: 'Users Deleted Successfully',
    });
  } catch (error) {
    next(error);
  }
};
//********************************authenticate********************************************* */
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await objUserModel.authenticateUser(email, password);
    //لو رجع يوزر هنعمل GENERATE TO TOKEN
     token = jwt.sign({ user }, cconfig.tokenSecret as unknown as string);
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'User Name And Password Not Match Pleace , Please Try Again',
      });
    }
    return res.json({
      status: 'success',
      data: { user, token },
      message: 'User Authenticated Successfully',
    });
  } catch (error) {
    next(error);
  }
};

export default token;