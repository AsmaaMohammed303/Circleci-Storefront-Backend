import { NextFunction, Request, Response } from 'express';
//import { request } from 'http';
import orderModel from '../models/order.model';
import jwt from 'jsonwebtoken';
//import { config } from 'dotenv';
import cconfig from '../middleware/config';
//create instaance from class ordermodel
const objorderModel = new orderModel();

//************************************* create *********************************************** */
export const createorder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product_id = req.body.product_id as unknown as string;
    const quantity = req.body.quantity as unknown as string;
    /*
    if (!product_id || !quantity) {
      res.status(400);
      res.send('Please Insert The Correct Params! eg. :product_id, :quantity');
      return false;
    }
*/
    //console.log(req.body);
    const order = await objorderModel.create(req.body);

    res.json({
      status: 'sucess',
      data: { ...order },
      message: 'order created sucessfully',
    });
  } catch (error) {
    //عشان عاملين error handling
    next(error);
  }
};
//********************************Get All order********************************************* */
export const getAllorders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //console.log(req.body);
    const orders = await objorderModel.getAllorders();
    res.json({
      status: 'success',
      data: jwt.sign({ orders }, cconfig.tokenSecret as unknown as string),
      message: 'All orders Returned Successfully',
    });
  } catch (error) {
    next(error);
  }
};
//********************************Get specific order********************************************* */
export const getSpecificorder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id as unknown as string;
    /*if (!id) {
      res.status(400).send('Please, Insert The Required Param id! eg. :id.');
      return false;
    }*/
    //console.log(req.body);
    const order = await objorderModel.getSpecificorder(
      req.params.id as unknown as string
    );
    if (!order) {
      return res.status(404).json({ message: '404 not found' });
    }
    res.json({
      status: 'success',
      data: jwt.sign({ order }, cconfig.tokenSecret as unknown as string),
      message: 'order Is Returned Successfully',
    });
  } catch (error) {
    next(error);
  }
};
//********************************update order********************************************* */
export const updateorder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product_id = req.body.product_id as unknown as string;
    const quantity = req.body.quantity as unknown as string;
    const id = req.body.id as unknown as string;
    if (!product_id || !quantity || !id) {
      res.status(400);
      res.send(
        'Please Insert The Correct Params! eg. :product_id, :quantity , :id'
      );
      return false;
    }
    //محتاجين نعمل express validator عشان نتأكد ان الداتا راجعه صح
    const order = await objorderModel.update(req.body);
    res.json({
      status: 'success',
      data: order,
      message: 'order Updated Successfully',
    });
  } catch (error) {
    next(error);
  }
};
//********************************delete all Orders******************************************* */
export const deleteAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await objorderModel.deleteAllOrders();
    res.json({
      status: 'success',
      data: order,
      message: 'Orders Deleted Successfully',
    });
  } catch (error) {
    next(error);
  }
};
//********************************delete order********************************************* */
export const deleteorder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id as unknown as string;
    //console.log(id);
    /*if (!id) {
      res.status(400).send('Please, Insert The Required Param id! eg. :id.');
      return false;
    }*/
    const order = await objorderModel.delete(
      req.params.id as unknown as string
    );
    res.json({
      status: 'success',
      data: order,
      message: 'order Deleted Successfully',
    });
  } catch (error) {
    next(error);
  }
};
