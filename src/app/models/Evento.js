import Sequelize, { Model } from 'sequelize';

class Evento extends Model {
  static init(sequelize) {
    super.init(
      {
        titulo: Sequelize.STRING(100),
        descricao: Sequelize.TEXT,
        data_evento: Sequelize.DATE,
        estado: Sequelize.STRING(2),
        cidade: Sequelize.STRING(50),
        bairro: Sequelize.STRING(50),
        endereco: Sequelize.STRING(100),
        numero: Sequelize.STRING(10),
        local: Sequelize.STRING(50),
        referencia: Sequelize.STRING(50),
        latitude: Sequelize.DECIMAL(12, 9),
        longitude: Sequelize.DECIMAL(12, 9),
        status: Sequelize.STRING,
      },
      {
        tableName: 'eventos',
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

export default Evento;
