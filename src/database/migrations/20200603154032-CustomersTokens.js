'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('customer_tokens', {
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
        onDelete: 'CASCADE',
        allowNull: false,
      },
      token: { unique: true, allowNull: false, type: Sequelize.STRING(16) },
      users_counts: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER,
      },
      users_limits: {
        allowNull: false,
        defaultValue: 2,
        type: Sequelize.INTEGER,
      },
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
    return queryInterface.dropTable('customer_tokens');
  },
};
