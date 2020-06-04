import { Router } from 'express';

import CustomerController from '../app/controllers/CustomerController';
import CustomerAddressController from '../app/controllers/CustomerAddressController';

import Researcher from '../app/controllers/ResearcherController';

const routes = new Router();

routes.get('/', (req, res) => {
  return res.status(200).json({ date: new Date(), isOnline: true });
});

/** Customers for Researchers */
routes.get('/customers', CustomerController.index);

routes.get('/customers/:id', CustomerController.show);

routes.post('/customer', CustomerController.store);

routes.post('/customer/address/:id', CustomerAddressController.store);

routes.get('/customer/address/:id', CustomerAddressController.show);

/** Routines for Researchers */
routes.get('/researchers', Researcher.index);

routes.get('/researchers/:id', Researcher.show);

routes.post('/researcher', Researcher.store);

export default routes;
