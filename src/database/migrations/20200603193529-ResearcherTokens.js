'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('researcher_tokens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      researcher_id: {
        type: Sequelize.BIGINT,
        references: {
          model: 'researchers',
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
    return queryInterface.dropTable('researcher_tokens');
  },
};
