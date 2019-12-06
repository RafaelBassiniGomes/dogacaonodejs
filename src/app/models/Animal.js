import Sequelize, { Model } from 'sequelize';

class Animal extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        descricao: Sequelize.STRING,
        peso: Sequelize.INTEGER,
        data_resgate: Sequelize.DATE,
        data_nascimento: Sequelize.DATE,
        tipo: Sequelize.INTEGER,
        porte: Sequelize.INTEGER,
        energia: Sequelize.INTEGER,
        amizade_caes: Sequelize.INTEGER,
        amizade_estranhos: Sequelize.INTEGER,
        amizade_crianca: Sequelize.INTEGER,
        status: Sequelize.STRING,
        sexo: Sequelize.STRING,
        castrado: Sequelize.BOOLEAN,
      },
      {
        tableName: 'animais',
        sequelize,
      }
    );

    // this.addHook('afterSave', async abrigo => {      console.log('afterSave');    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.Abrigo, { foreignKey: 'abrigo_id', as: 'abrigo' });
  }
}

export default Animal;
