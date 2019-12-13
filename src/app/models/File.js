import Sequelize, { Model } from 'sequelize';

class File extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${process.env.APP_URL}/files/${this.path}`;
          },
        },
        avatar: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${process.env.APP_URL}/avatar/${this.path}`;
          },
        },
        facebook: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${process.env.APP_URL}/facebook/${this.path}`;
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default File;
