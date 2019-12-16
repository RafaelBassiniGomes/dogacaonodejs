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
        url_300: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${process.env.APP_URL}/files/300/${
              this.path.split('.')[0]
            }.webp`;
          },
        },
        url_600: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${process.env.APP_URL}/files/600/${
              this.path.split('.')[0]
            }.webp`;
          },
        },
        url_100: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${process.env.APP_URL}/files/100/${
              this.path.split('.')[0]
            }.webp`;
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
