module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('adocoes', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      nome: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      telefone: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      idade: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      sexo: {
        type: Sequelize.STRING(1),
        allowNull: false,
      },
      estado_civil: {
        type: Sequelize.INTEGER,
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
      complemento: {
        type: Sequelize.STRING(100),
      },
      energia: Sequelize.INTEGER,
      qtd_filhos: Sequelize.INTEGER,
      qtd_filhos_menor: Sequelize.INTEGER,
      mora_em: Sequelize.INTEGER,
      tipo_moradia: Sequelize.INTEGER,
      tempo_livre: Sequelize.INTEGER,
      descricao: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      abrigo_id: {
        type: Sequelize.INTEGER,
        references: { model: 'abrigos', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false,
      },
      animal_id: {
        type: Sequelize.INTEGER,
        references: { model: 'animais', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      lida: {
        type: Sequelize.BOOLEAN,
        defaut: false,
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
    return queryInterface.dropTable('adocoes');
  },
};
