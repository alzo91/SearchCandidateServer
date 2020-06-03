/**It is refering about customers table */
import Sequelize, { Model } from 'sequelize';

import moment from 'moment-timezone';

class CustomerToken extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          primaryKey: true,
          type: Sequelize.BIGINT,
          autoIncrement: true,
        },
        token: Sequelize.STRING,
        users_counts: Sequelize.INTEGER,
        users_limits: Sequelize.INTEGER,
        token_uuid: Sequelize.STRING,
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
      { underscored: true, sequelize }
    );

    /* this.belongsTo(sequelize.models.Customer, {
      foreignKey: 'customer_id',
    }); */

    /*return this;*/
  }
  static associate(sequelize) {
    console.log('It called a Associate CustomerToken');
    this.belongsTo(sequelize.models.Customer, { foreignKey: 'customer_id' });
  }
}

export default CustomerToken;
