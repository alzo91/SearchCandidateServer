/**It is refering about customers table */
import Sequelize, { Model } from 'sequelize';

import bcrypt from 'bcryptjs';
import moment from 'moment-timezone';

class Customer extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        full_name: Sequelize.STRING,
        email: Sequelize.STRING,
        phone: Sequelize.STRING,
        code: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
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

    this.addHook('beforeSave', async (customer) => {
      if (customer.password) {
        customer.password_hash = await bcrypt.hash(customer.password, 8);
      }
    });

    return this;
  }

  chechkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default Customer;
