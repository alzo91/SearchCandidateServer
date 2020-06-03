import nodeUUID from 'uuid/dist/v1';
import CustomersToken from '../models/CustomersToken';

class GenerateTokensController {
  async generateCustomerToken(customerId: Number) {
    let isTokenValid = false;
    let new_token;
    let token_uuid;

    while (!!isTokenValid === false) {
      let opt = { msecs: new Date().getTime(), nsecs: 5678 };
      token_uuid = nodeUUID(opt);
      const [token] = token_uuid.split('-');
      new_token = String(token).toUpperCase();
      const customer_token = await CustomersToken.findOne({
        where: { token },
      });
      console.log(customer_token);
      if (!customer_token) {
        isTokenValid = true;
      } else {
        isTokenValid = false;
      }
    }
    const newCustomerToken = {
      customers_id: customerId,
      token: new_token,
      token_uuid: token_uuid,
    };
    console.log(newCustomerToken);

    const customer_token = await CustomersToken.create(newCustomerToken);

    return customer_token;
  }
}

export default new GenerateTokensController();
