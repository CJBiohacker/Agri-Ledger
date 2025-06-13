'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('plantios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      propriedadeid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'propriedades',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', // Se uma propriedade for deletada, seus registros de plantio também são.
      },
      safraid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'safras',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', // Se uma safra for deletada, seus registros de plantio também são.
      },
      culturaid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'culturas',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT', // Não permite deletar uma cultura se ela estiver em uso em plantios.
      },
      area_plantada: {
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

    // Adicionar índices compostos pode ser útil para otimizar consultas
    // Exemplo: await queryInterface.addIndex('plantios', ['propriedadeid', 'safraid', 'culturaid'], { unique: true, name: 'plantio_unique_idx' });
    // Isso garantiria que não haja entradas duplicadas para a mesma propriedade, safra e cultura.
    // Decida se a unicidade é por esses três campos ou se pode haver múltiplos registros (ex: plantios em lotes diferentes da mesma cultura na mesma safra).
    // Por ora, não adicionarei o índice unique para permitir flexibilidade.
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('plantios');
  },
};
