/**It is refering about customers table */
import Sequelize, { Model } from 'sequelize';

import moment from 'moment-timezone';

class Researcher extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          primaryKey: true,
          type: Sequelize.BIGINT,
          autoIncrement: true,
        },
        name: Sequelize.STRING,
        full_name: Sequelize.STRING,
        email: Sequelize.STRING,
        phone: Sequelize.STRING,
        code: Sequelize.STRING,
        avatar: Sequelize.STRING,
        is_candidate: Sequelize.BOOLEAN,
        is_blocked: Sequelize.BOOLEAN,
        creation: {
          type: Sequelize.VIRTUAL,
          get() {
            return moment(this.get('created_at'))
              .tz('American/Sao_Paulo')
              .format('YYYY-MM-DD HH:mm');
          },
        },
        last_updated: {
          type: Sequelize.VIRTUAL,
          get() {
            return moment(this.get('updated_at'))
              .tz('American/Sao_Paulo')
              .format('YYYY-MM-DD HH:mm');
          },
        },
      },
      { sequelize }
    );
  }
  static associate(sequelize) {
    console.log('It called a Associate Researcher');
    this.belongsTo(sequelize.models.Customer, { foreignKey: 'customer_id' });
  }
  /* static associate(sequelize) {
    console.log('It called a Associate Researcher');
    this.hasMany(sequelize.models.Customer, {
      foreignKey: 'customer_id',
    });
    this.hasMany(sequelize.models.Researcher, {
      foreignKey: 'customer_id',
    });
  } */
}

export default Researcher;
