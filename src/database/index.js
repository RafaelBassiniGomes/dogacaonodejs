import Sequelize from 'sequelize';

import User from '../app/models/User';
import File from '../app/models/File';
import Abrigo from '../app/models/Abrigo';
import Animal from '../app/models/Animal';
import Remedio from '../app/models/Remedio';
import Produto from '../app/models/Produto';
import Parceiro from '../app/models/Parceiro';
import Evento from '../app/models/Evento';

import databaseConfig from '../config/database';

const models = [User, File, Abrigo, Animal, Remedio, Produto, Parceiro, Evento];

class DataBase {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new DataBase();
