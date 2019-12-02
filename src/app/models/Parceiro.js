import Sequelize, { Model } from 'sequelize';

class Parceiro extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        link: Sequelize.STRING,
        ordenacao: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Parceiro;
