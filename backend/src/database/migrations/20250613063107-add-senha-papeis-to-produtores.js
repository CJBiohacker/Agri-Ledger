'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('produtores', 'senha', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn('produtores', 'papeis', {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false,
      defaultValue: ['generico'],
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('produtores', 'senha');
    await queryInterface.removeColumn('produtores', 'papeis');
  },
};
