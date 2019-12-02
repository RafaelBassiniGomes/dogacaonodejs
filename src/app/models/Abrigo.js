import Sequelize, { Model } from 'sequelize';

class Abrigo extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        title: {
          type: Sequelize.VIRTUAL,
          get() {
            return this.nome;
          },
        },
        slug: {
          type: Sequelize.STRING,
          get() {
            return this.nome.replace(/ /g, '');
          },
        },
        email: Sequelize.STRING,
        telefone: Sequelize.STRING,
        estado: Sequelize.STRING,
        cidade: Sequelize.STRING,
        bairro: Sequelize.STRING,
        endereco: Sequelize.STRING,
        numero: Sequelize.STRING,
        complemento: Sequelize.STRING,
        quemSomos: Sequelize.STRING,
        comoAjudar: Sequelize.STRING,
        status: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    // this.addHook('afterSave', async abrigo => {      console.log('afterSave');    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

export default Abrigo;
