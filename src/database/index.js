import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import Customer from '../app/models/Customer';

const models = [Customer];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    // Customer.init(this.connection);
    models.map((model) => model.init(this.connection));
  }
}

export default new Database();
