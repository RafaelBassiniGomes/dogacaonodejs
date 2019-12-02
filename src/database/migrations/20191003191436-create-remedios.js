module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('remedios', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      tipo: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      fechado: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      observacao: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      abrigo_id: {
        type: Sequelize.INTEGER,
        references: { model: 'abrigos', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('remedios');
  },
};
