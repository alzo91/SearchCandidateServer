import nodeUUID from 'uuid/dist/v1';
import CustomerToken from '../models/CustomerToken';

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

      const customer_token = await CustomerToken.findOne({
        where: { token },
      });

      if (!customer_token) {
        isTokenValid = true;
      } else {
        isTokenValid = false;
      }
    }
    const newCustomerToken = {
      customer_id: customerId,
      token: new_token,
      token_uuid: token_uuid,
    };
    console.log(newCustomerToken);

    const customer_token = await CustomerToken.create(newCustomerToken);

    return customer_token;
  }
}

export default new GenerateTokensController();
