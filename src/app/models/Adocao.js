import Sequelize, { Model } from 'sequelize';

class Evento extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING(100),
        email: Sequelize.STRING(100),
        telefone: Sequelize.STRING(20),
        idade: Sequelize.INTEGER,
        sexo: Sequelize.STRING(1),
        estado_civil: Sequelize.INTEGER,
        estado: Sequelize.STRING(2),
        cidade: Sequelize.STRING(50),
        bairro: Sequelize.STRING(50),
        endereco: Sequelize.STRING(100),
        numero: Sequelize.STRING(10),
        complemento: Sequelize.STRING(100),
        energia: Sequelize.INTEGER,
        qtd_filhos: Sequelize.INTEGER,
        qtd_filhos_menor: Sequelize.INTEGER,
        mora_em: Sequelize.INTEGER,
        tipo_moradia: Sequelize.INTEGER,
        tempo_livre: Sequelize.INTEGER,
        status: Sequelize.STRING,
        descricao: Sequelize.TEXT,
        lida: Sequelize.BOOLEAN,
      },
      {
        tableName: 'adocoes',
        sequelize,
      }
    );

    // this.addHook('afterSave', async abrigo => {      console.log('afterSave');    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Animal, { foreignKey: 'animal_id', as: 'animal' });
    this.belongsTo(models.Abrigo, { foreignKey: 'abrigo_id', as: 'abrigo' });
  }
}

export default Evento;
