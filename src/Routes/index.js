import { Router } from 'express';
import CustomerController from '../app/controllers/CustomerController';

const routes = new Router();

routes.get('/', (req, res) => {
  return res.status(200).json({ date: new Date(), isOnline: true });
});

routes.get('/customers', CustomerController.index);

routes.get('/customers/:id', CustomerController.show);

routes.post('/customer', CustomerController.store);

export default routes;
