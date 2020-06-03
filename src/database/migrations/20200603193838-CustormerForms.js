'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('customer_forms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      customer_id: {
        type: Sequelize.BIGINT,
        references: {
          model: 'customers',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      name: { allowNull: false, type: Sequelize.STRING(100) },
      fields: { allowNull: false, type: Sequelize.JSON },
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
    return queryInterface.dropTable('customer_forms');
  },
};
