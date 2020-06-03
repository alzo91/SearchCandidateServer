import { Op } from 'sequelize';
import Customer from '../models/Customer';

class CustomerController {
  async index(request, response) {
    const customers = await Customer.findAll();
    return response.status(200).json(customers);
  }

  async show(request, response) {
    const { id } = request.params;
    const customer = await Customer.findByPk(id);
    return response.status(200).json(customer);
  }

  async store(request, response) {
    const { code, email, phone } = request.body;
    const isCustomer = await Customer.findOne({
      where: { [Op.or]: [{ code }, { email }, { phone }] },
    });

    if (!!isCustomer) {
      return response.status(401).json(isCustomer);
    }

    const customer = await Customer.create({ ...request.body });
    console.log(customer);
    return response.status(200).json(customer);
  }

  async update(request, response) {
    const { id } = request.params;
    return response.status(200).json({ id });
  }
}

export default new CustomerController();
