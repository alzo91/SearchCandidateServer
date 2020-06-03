'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('customer_addresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      id_customer: {
        type: Sequelize.BIGINT,
        references: {
          model: 'customers',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      country: { allowNull: true, type: Sequelize.STRING(2), default: 'BR' },
      zip_code: { allowNull: true, type: Sequelize.STRING(10) },
      state: { allowNull: true, type: Sequelize.STRING(2) },
      city: { allowNull: true, type: Sequelize.STRING },
      street: { allowNull: true, type: Sequelize.STRING },
      neighborhood: { allowNull: true, type: Sequelize.STRING },
      is_blocked: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
      created_at: { allowNull: false, type: Sequelize.DATE },
      updated_at: { allowNull: false, type: Sequelize.DATE },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('customer_addresses');
  },
};
