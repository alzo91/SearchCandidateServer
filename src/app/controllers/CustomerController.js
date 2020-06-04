import { Op } from 'sequelize';
import Customer from '../models/Customer';
import CustomerToken from '../models/CustomerToken';
import CustomerAddress from '../models/CustomerAddress';
import GenerateTokensControler from './GenerateTokensController';

class CustomerController {
  async index(request, response) {
    const customers = await Customer.findAll({
      attributes: [
        'id',
        'name',
        'email',
        'phone',
        'code',
        'is_candidate',
        'is_blocked',
        'creation',
        'last_updated',
      ],
    });
    if (customers.length === 0) {
      return response.status(404).json({ error: `Users weren't found!` });
    }

    return response.status(200).json(customers);
  }

  async show(request, response) {
    const { id } = request.params;
    const customer = await Customer.findOne({
      where: { id },
      include: [
        {
          model: CustomerToken,
          attributes: ['token', 'users_counts', 'users_limits', 'last_updated'],
        },
        {
          model: CustomerAddress,
          attributes: ['id', 'country', 'state', 'city', 'zip_code'],
          where: { is_blocked: false },
        },
      ],
      attributes: [
        'id',
        'name',
        'full_name',
        'email',
        'phone',
        'code',
        'is_candidate',
        'is_blocked',
        'last_updated',
      ],
    });

    if (!customer) {
      return response.status(404).json({ error: `User id wasn't found!` });
    }
    return response.status(200).json(customer);
  }

  async store(request, response) {
    const { code, email, phone } = request.body;

    if (!!code === false) {
      let error = { error: `You should information field "CODE"!` };
      return response.status(409).json(error);
    }

    if (!!email === false) {
      let error = { error: `You should information field "Email"!` };
      return response.status(409).json(error);
    }

    if (!!phone === false) {
      let error = { error: `You should information field "Phone"` };
      return response.status(409).json(error);
    }

    const isCustomer = await Customer.findOne({
      where: { [Op.or]: [{ code }, { email }, { phone }] },
    });

    if (!!isCustomer) {
      return response.status(401).json(isCustomer);
    }

    const customer = await Customer.create({ ...request.body });

    const token = await GenerateTokensControler.generateCustomerToken(
      customer.id
    );

    return response.status(200).json({ customer, token });
  }

  async update(request, response) {
    const { id } = request.params;
    if (!!id === false) {
      let error = { error: `You should information a customer id` };
      return response.status(409).json(error);
    }

    const { name, full_name, password, avatar } = request.body;
    const customer = await Customer.findByPk(id);

    customer.update({ name, full_name, avatar, password });

    return response.status(200).json({ id });
  }
}

export default new CustomerController();
