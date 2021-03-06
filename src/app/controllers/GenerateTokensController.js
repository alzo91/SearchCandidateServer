import {v1 as uuidv1} from 'uuid';
import CustomerToken from '../models/CustomerToken';
import ResearcherToken from '../models/ResearcherToken';
class GenerateTokensController {
  async generateCustomerToken(customerId) {
    let isTokenValid = false;
    let new_token;
    let token_uuid;

    while (!!isTokenValid === false) {

      token_uuid = uuidv1({msecs: new Date().getTime(),nsecs:5678})
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

  async generateResearcherToken(researcherId) {
    let isTokenValid = false;
    let new_token;
    let token_uuid;

    while (!!isTokenValid === false) {
      let opt = { msecs: new Date().getTime(), nsecs: 5678 };
      token_uuid = uuidv1({msecs: new Date().getTime(),nsecs:5678});
      const [token] = token_uuid.split('-');
      new_token = String(token).toUpperCase();

      const research_token = await ResearcherToken.findOne({
        where: { token },
      });

      if (!research_token) {
        isTokenValid = true;
      } else {
        isTokenValid = false;
      }
    }
    const newResearchToken = {
      researcher_id: researcherId,
      token: new_token,
      token_uuid: token_uuid,
    };
    console.log(newResearchToken);

    const researcher_token = await ResearcherToken.create(newResearchToken);

    return researcher_token;
  }
}

export default new GenerateTokensController();
