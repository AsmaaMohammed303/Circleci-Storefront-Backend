import { Router } from 'express';
import usersRoute from './api/users.routes';
import prodcutRoutes from './api/products.routes';
import orderRoutes from './api/orders.routes';

const routes = Router();

routes.use('/users', usersRoute);

routes.use('/products', prodcutRoutes);

routes.use('/orders', orderRoutes);
export default routes;
