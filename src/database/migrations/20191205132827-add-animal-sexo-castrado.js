module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('animais', 'sexo', {
        type: Sequelize.STRING(1),
      }),
      queryInterface.addColumn('animais', 'castrado', {
        type: Sequelize.BOOLEAN,
      }),
    ]);
  },

  down: queryInterface => {
    return Promise.all([
      queryInterface.removeColumn('animais', 'sexo'),
      queryInterface.removeColumn('animais', 'castrado'),
    ]);
  },
};
