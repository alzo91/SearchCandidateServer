'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('customer_answers', {
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
        allowNull: false,
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
      form_id: {
        type: Sequelize.BIGINT,
        references: {
          model: 'customer_forms',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      fields: { allowNull: false, type: Sequelize.JSON },
      answeres: { allowNull: false, type: Sequelize.JSON },
      created_at: { allowNull: false, type: Sequelize.DATE },
      updated_at: { allowNull: false, type: Sequelize.DATE },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('customer_answers');
  },
};
