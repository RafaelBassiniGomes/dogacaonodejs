import Sequelize, { Model } from 'sequelize';

class Produto extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        descricao: Sequelize.STRING,
        preco: Sequelize.NUMBER,
        quantidade: Sequelize.INTEGER,
        tamanho: Sequelize.STRING,
        status: Sequelize.STRING,
      },
      {
        tableName: 'produtos',
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
    this.belongsTo(models.Abrigo, { foreignKey: 'abrigo_id', as: 'abrigo' });
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

export default Produto;
