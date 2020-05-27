'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('researchers', {
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
        onDelete: 'SET NULL',
        allowNull: true,
      },
      name: { allowNull: false, type: Sequelize.STRING(100) },
      full_name: { allowNull: true, type: Sequelize.STRING },
      phone: { allowNull: false, type: Sequelize.STRING(150) },
      email: { unique: true, allowNull: false, type: Sequelize.STRING(150) },
      code: { unique: true, allowNull: false, type: Sequelize.STRING(20) },
      avatar: { allowNull: false, type: Sequelize.STRING },
      is_candidate: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN,
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
    return queryInterface.dropTable('researchers');
  },
};
