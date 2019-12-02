import Sequelize, { Model } from 'sequelize';

class Remedio extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        quantidade: Sequelize.INTEGER,
        tipo: Sequelize.INTEGER,
        fechado: Sequelize.BOOLEAN,
        observacao: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    // this.addHook('afterSave', async abrigo => {      console.log('afterSave');    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Abrigo, { foreignKey: 'abrigo_id', as: 'abrigo' });
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

export default Remedio;
