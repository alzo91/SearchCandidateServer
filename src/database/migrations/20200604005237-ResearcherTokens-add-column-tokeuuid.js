'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('researcher_tokens', 'token_uuid', {
      allowNull: false,
      type: Sequelize.STRING,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('researcher_tokens', 'token_uuid');
  },
};
