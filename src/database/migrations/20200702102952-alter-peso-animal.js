module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('animais', 'peso', {
      type: Sequelize.DECIMAL(6, 2),
    });
  },

  down: (queryInterface, Sequelize) => {
    return null;
  },
};
