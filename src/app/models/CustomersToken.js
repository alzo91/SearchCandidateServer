/**It is refering about customers table */
import Sequelize, { Model } from 'sequelize';

import moment from 'moment-timezone';

class CustomersToken extends Model {
  static init(sequelize) {
    super.init(
      {
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
      { sequelize }
    );

    this.belongsTo(sequelize.models.Customer, {
      foreignKey: 'customers_id',
      constraints: true,
    });

    return this;
  }
}

export default CustomersToken;
