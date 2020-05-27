module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('hash_tokens', {
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
      researchers_id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        references: {
          model: 'researchers',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      token: { allowNull: false, type: Sequelize.TEXT },
      reset_token: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER,
      },
      expires_in: { allowNull: false, type: Sequelize.DATE },
      created_at: { allowNull: false, type: Sequelize.DATE },
      updated_at: { allowNull: false, type: Sequelize.DATE },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('hash_tokens');
  },
};
