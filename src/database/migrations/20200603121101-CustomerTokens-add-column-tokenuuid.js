'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('customers_tokens', 'token_uuid', {
      allowNull: false,
      type: Sequelize.STRING,
    });
    // queryInterface.createTable('users', { id: Sequelize.INTEGER });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('customers_tokens', 'token_uuid');
  },
};
