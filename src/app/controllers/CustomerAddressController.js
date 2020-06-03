import Customer from '../models/Customer';
import CustomerAddress from '../models/CustomerAddress';

class CustomerAddrressController {
  async show(request, response) {
    const { id } = request.params;
    const customer = await Customer.findAll({
      include: [{ model: CustomerAddress }],
      where: { id },
    });

    if (customer.length === 0) {
      return response.status(404).json({ error: `You don't have address!` });
    }
    return response.status(200).json(customer);
  }

  async store(request, response) {
    const { id } = request.params;
    const address = await CustomerAddress.create({
      id_customer: id,
      ...request.body,
    });
    return response.status(200).json(address);
  }
}

export default new CustomerAddrressController();
