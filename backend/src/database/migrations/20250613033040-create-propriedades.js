'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('propriedades', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      produtorid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          // Chave estrangeira para produtores
          model: 'produtores', // Nome da tabela de produtores
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', // Ou 'SET NULL' ou 'RESTRICT' dependendo da sua lógica de negócio
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cidade: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      estado: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      areatotal: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      areaagricultavel: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      areavegetacao: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      createdat: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedat: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('propriedades');
  },
};
