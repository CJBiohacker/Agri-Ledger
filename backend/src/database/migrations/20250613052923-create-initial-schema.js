'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto";');

    await queryInterface.createTable('produtores', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      cpfCnpj: {
        type: Sequelize.STRING(32), // Ajustado para um tamanho razoável
        allowNull: false,
        unique: true,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });

    await queryInterface.createTable('culturas', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });

    await queryInterface.createTable('propriedades', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      produtorId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'produtores',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', // Ou RESTRICT/SET NULL conforme regra de negócio
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cidade: { // Adicionado conforme DTO
        type: Sequelize.STRING,
        allowNull: false,
      },
      estado: { // Adicionado conforme DTO
        type: Sequelize.STRING(2), // Geralmente 2 caracteres para estado
        allowNull: false,
      },
      areaTotal: { // Adicionado conforme DTO - areaTotal em hectares
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      areaAgricultavel: { // Adicionado conforme DTO - areaAgricultavel em hectares
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      areaVegetacao: { // Adicionado conforme DTO - areaVegetacao em hectares
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });

    await queryInterface.createTable('safras', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      propriedadeId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'propriedades',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', // Se uma propriedade for deletada, suas safras também são.
      },
      nome: { // Adicionado
        type: Sequelize.STRING,
        allowNull: false,
      },
      dataInicio: { // Adicionado
        type: Sequelize.DATEONLY, // Apenas data, sem hora
        allowNull: false,
      },
      dataFim: { // Adicionado
        type: Sequelize.DATEONLY, // Apenas data, sem hora
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });

    await queryInterface.createTable('plantios', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      propriedadeId: { // Adicionado para facilitar queries diretas, embora redundante se safraId está presente
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'propriedades',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', // Se a propriedade é deletada, os plantios associados diretamente também são.
      },
      safraId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'safras',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', // Se uma safra é deletada, seus plantios são deletados.
      },
      culturaId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'culturas',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT', // Não permitir deletar cultura se estiver em uso em um plantio.
      },
      areaPlantada: { // areaPlantada em hectares
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });

    // Adicionar índice composto para evitar plantios duplicados (mesma safra, mesma cultura)
    await queryInterface.addIndex('plantios', ['safraId', 'culturaId'], {
      unique: true,
      name: 'idx_plantios_safra_cultura_unique',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('plantios');
    await queryInterface.dropTable('safras');
    await queryInterface.dropTable('propriedades');
    await queryInterface.dropTable('culturas');
    await queryInterface.dropTable('produtores');
    // Não é necessário remover a extensão pgcrypto no down, geralmente.
  }
};
