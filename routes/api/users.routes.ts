import { Router } from 'express';
import * as controllers from '../../controllers/users.controllers';
import authenticationMiddlware from '../../middleware/authentcation.middleware';
const routes = Router();

// / ===> api/users
routes
  .route('/')
  .get(authenticationMiddlware, controllers.getAllUsers)
  .post(controllers.createUser)
  .delete(authenticationMiddlware,controllers.deleteAllUsers);
routes
  .route('/getSpecificUser/:id')
  .get(authenticationMiddlware,controllers.getSpecificUser);
routes
  .route('/:id')
  .patch(authenticationMiddlware, controllers.updateUser);
  routes
  .route('/deleteSpecificUser/:id')
  .delete(authenticationMiddlware,controllers.deleteUser);

routes.route('/authenticate').post(controllers.authenticate);

//routes.post('/',controllers.create);

export default routes;
