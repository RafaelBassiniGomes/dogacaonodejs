module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('eventos', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      titulo: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      descricao: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      data_evento: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      estado: {
        type: Sequelize.STRING(2),
        allowNull: false,
      },
      cidade: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      bairro: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      endereco: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      numero: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      local: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      referencia: {
        type: Sequelize.STRING(50),
      },
      latitude: Sequelize.DECIMAL(12, 9),
      longitude: Sequelize.DECIMAL(12, 9),

      avatar_id: {
        type: Sequelize.INTEGER,
        references: { model: 'files', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
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
      status: {
        type: Sequelize.STRING(2),
        allowNull: true,
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
    return queryInterface.dropTable('eventos');
  },
};
