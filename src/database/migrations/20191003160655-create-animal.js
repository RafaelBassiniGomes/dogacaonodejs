module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('animais', {
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
      descricao: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      peso: Sequelize.INTEGER,
      data_resgate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      data_nascimento: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      tipo: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      porte: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      energia: Sequelize.INTEGER,
      amizade_caes: Sequelize.INTEGER,
      amizade_estranhos: Sequelize.INTEGER,
      amizade_crianca: Sequelize.INTEGER,
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
        type: Sequelize.STRING,
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
    return queryInterface.dropTable('animais');
  },
};
