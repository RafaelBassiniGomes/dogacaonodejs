import Sequelize, { Model } from 'sequelize';

class Notificacao extends Model {
  static init() {
    super.init({
      id: Sequelize.INTEGER,
      descricao: Sequelize.STRING,
      lida: Sequelize.BOOLEAN,
      data: Sequelize.DATE,
      user: Sequelize.INTEGER,
    });

    return this;
  }
}

export default Notificacao;
