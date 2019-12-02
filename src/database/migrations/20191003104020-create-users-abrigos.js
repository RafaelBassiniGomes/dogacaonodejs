module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users_abrigos', {
      abrigo_id: {
        type: Sequelize.INTEGER,
        references: { model: 'abrigos', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users_abrigos');
  },
};
