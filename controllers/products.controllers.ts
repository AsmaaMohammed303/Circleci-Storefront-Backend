import { NextFunction, Request, Response } from 'express';
//import { request } from 'http';
import productModel from '../models/product.model';
import jwt from 'jsonwebtoken';
//import { config } from 'dotenv';
import cconfig from '../middleware/config';
//create instaance from class productmodel
const objproductModel = new productModel();

//************************************* create *********************************************** */
export const createproduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const proName = req.body.proName as unknown as string;
    const price = req.body.price as unknown as string;
    if (!proName || !price) {
      res.status(400);
      res.send('Please Insert The Correct Params! eg. :proName, :price');
      return false;
    }

    //console.log(req.body);
    const product = await objproductModel.create(req.body);

    res.json({
      status: 'sucess',
      data: { ...product },
      message: 'product created sucessfully',
    });
  } catch (error) {
    //عشان عاملين error handling
    next(error);
  }
};
//********************************Get All product********************************************* */
export const getAllproducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //console.log(req.body);
    const products = await objproductModel.getAllproducts();
    res.json({
      status: 'success',
      data: jwt.sign({ products }, cconfig.tokenSecret as unknown as string),
      message: 'All products Returned Successfully',
    });
  } catch (error) {
    next(error);
  }
};
//********************************Get specific product********************************************* */
export const getSpecificproduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    /*const id = req.params.id as unknown as string;
    if (!id) {
      res.status(400).send('Please, Insert The Required Param id! eg. :id.');
      return false;
    }*/
    //console.log(req.body);
    const product = await objproductModel.getSpecificproduct(
      req.params.id as unknown as string
    );
    if (!product) {
      return res.status(404).json({ message: '404 not found' });
    }
    res.json({
      status: 'success',
      data: jwt.sign({ product }, cconfig.tokenSecret as unknown as string),
      message: 'product Is Returned Successfully',
    });
  } catch (error) {
    next(error);
  }
};
//********************************update product********************************************* */
export const updateproduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const proName = req.body.proName as unknown as string;
    const price = req.body.price as unknown as string;
    const id = req.body.id as unknown as string;
    if (!proName || !price || !id) {
      res.status(400);
      res.send('Please Insert The Correct Params! eg. :proName, :price , :id');
      return false;
    }
    //محتاجين نعمل express validator عشان نتأكد ان الداتا راجعه صح
    const product = await objproductModel.update(req.body);
    res.json({
      status: 'success',
      data: product,
      message: 'product Updated Successfully',
    });
  } catch (error) {
    next(error);
  }
};
//********************************delete all Productss******************************************* */
export const deleteAllproducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await objproductModel.deleteAllproducts();
    res.json({
      status: 'success',
      data: product,
      message: 'Products Deleted Successfully',
    });
  } catch (error) {
    next(error);
  }
};
//********************************delete product********************************************* */
export const deleteproduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    /*const id = req.params.id as unknown as string;
    console.log(id);
    if (!id) {
      res.status(400).send('Please, Insert The Required Param id! eg. :id.');
      return false;
    }*/
    const product = await objproductModel.delete(
      req.params.id as unknown as string
    );
    res.json({
      status: 'success',
      data: product,
      message: 'product Deleted Successfully',
    });
  } catch (error) {
    next(error);
  }
};
