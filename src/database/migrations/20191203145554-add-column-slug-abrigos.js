module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('abrigos', 'slug', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('abrigos', 'slug');
  },
};
