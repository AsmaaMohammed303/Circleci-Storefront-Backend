import { Router } from 'express';
import * as controllers from '../../controllers/products.controllers';
import authenticationMiddlware from '../../middleware/authentcation.middleware';

const routes = Router();

// / ===> api/products
routes
  .route('/')
  .get(authenticationMiddlware, controllers.getAllproducts)
  .post(controllers.createproduct)
  .delete(authenticationMiddlware,controllers.deleteAllproducts);
routes
  .route('/getSpecificproduct/:id')
  .get(authenticationMiddlware,controllers.getSpecificproduct);
routes
  .route('/:id')
  .patch(authenticationMiddlware, controllers.updateproduct);
  routes
  .route('/deleteSpecificproduct/:id')
  .delete(authenticationMiddlware,controllers.deleteproduct);
  
  routes.route('/authenticate').post(controllers.authenticate);
/*
routes
  .route('/')
  .get(controllers.getAllproducts)
  .post(authenticationMiddlware, controllers.createproduct);
routes
  .route('/:id')
  .get(controllers.getSpecificproduct)
  .patch(authenticationMiddlware, controllers.updateproduct)
  .delete(authenticationMiddlware, controllers.deleteproduct);
*/
//routes.route('/authenticate').post(controllers.authenticate);

//routes.post('/',controllers.create);

export default routes;
