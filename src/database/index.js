import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import Customer from '../app/models/Customer';
import CustomerToken from '../app/models/CustomerToken';
import CustomerAddress from '../app/models/CustomerAddress';
const models = [Customer, CustomerToken, CustomerAddress];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map((model) => model.init(this.connection));
    models.map(
      (model) => !!model.associate && model.associate(this.connection)
    );

    // Customer.associate(this.connection);
    // CustomerToken.associate(this.connection);
  }
}

export default new Database();
