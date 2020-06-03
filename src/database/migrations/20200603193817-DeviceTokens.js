'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('device_tokens', {
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
        allowNull: true,
      },
      researcher_id: {
        type: Sequelize.BIGINT,
        references: {
          model: 'researchers',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: true,
      },
      uuid: { allowNull: false, type: Sequelize.STRING(64) },
      reset_token: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER,
      },
      platform: {
        allowNull: true,
        type: Sequelize.STRING(10),
      },
      build_version: {
        allowNull: true,
        type: Sequelize.STRING(5),
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

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('device_tokens');
  },
};
