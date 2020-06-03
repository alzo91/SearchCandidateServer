/**It is refering about customers table */
import Sequelize, { Model } from 'sequelize';

import moment from 'moment-timezone';

class CustomerAddress extends Model {
  static init(sequelize) {
    super.init(
      {
        country: Sequelize.STRING,
        zip_code: Sequelize.STRING,
        state: Sequelize.STRING,
        city: Sequelize.STRING,
        street: Sequelize.STRING,
        neighborhood: Sequelize.STRING,
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
      { underscored: true, sequelize }
    );

    /* this.belongsTo(sequelize.models.Customer, {
      foreignKey: 'customer_id',
    }); */

    /*return this;*/
  }
  static associate(sequelize) {
    console.log('It called a Associate CustomerAddress');
    this.belongsTo(sequelize.models.Customer, { foreignKey: 'id_customer' });
  }
}

export default CustomerAddress;
