import { Router } from 'express';
import * as controllers from '../../controllers/orders.controllers';
import authenticationMiddlware from '../../middleware/authentcation.middleware';

const routes = Router();

// / ===> api/orders
routes
  .route('/')
  .get(authenticationMiddlware, controllers.getAllorders)
  .post(controllers.createorder)
  .delete(authenticationMiddlware,controllers.deleteAllOrders);
routes
  .route('/getSpecificorder/:id')
  .get(authenticationMiddlware,controllers.getSpecificorder);
routes
  .route('/:id')
  .patch(authenticationMiddlware, controllers.updateorder);
  routes
  .route('/deleteSpecificorder/:id')
  .delete(authenticationMiddlware,controllers.deleteorder);
  routes.route('/authenticate').post(controllers.authenticate);
  
export default routes;
