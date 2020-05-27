'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('customers_address', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      customers_id: {
        type: Sequelize.BIGINT,
        references: {
          model: 'customers',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      name: { allowNull: false, type: Sequelize.STRING(100) },
      count: { allowNull: true, type: Sequelize.STRING(2), default: 'BR' },
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

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('customers_address');
  },
};
