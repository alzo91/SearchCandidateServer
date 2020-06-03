/**It is refering about customers table */
import Sequelize, { Model } from 'sequelize';

import bcrypt from 'bcryptjs';
import moment from 'moment-timezone';

class Customer extends Model {
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

    // return this;
  }

  static associate(sequelize) {
    console.log('It called a Associate Customer');
    this.hasMany(sequelize.models.CustomerToken, {
      foreignKey: 'customer_id',
    });
    this.hasMany(sequelize.models.CustomerAddress, {
      foreignKey: 'id_customer',
    });
    /* this.hasMany(sequelize.models.CustomerAddress, {
      foreignKey: 'customer_id',
    }); */
  }

  chechkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default Customer;
