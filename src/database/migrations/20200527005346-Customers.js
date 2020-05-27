'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('customers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      name: { allowNull: false, type: Sequelize.STRING(100) },
      full_name: { allowNull: true, type: Sequelize.STRING },
      email: { unique: true, allowNull: false, type: Sequelize.STRING(150) },
      phone: { unique: true, allowNull: false, type: Sequelize.STRING(150) },
      code: { unique: true, allowNull: false, type: Sequelize.STRING(20) },
      password_hash: { allowNull: false, type: Sequelize.STRING },
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
    return queryInterface.dropTable('customers');
  },
};
