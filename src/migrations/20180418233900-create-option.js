/* eslint-disable no-unused-vars, no-sequences, no-unused-expressions */

'use strict',

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Options', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
      required: true,
    },
    questionId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Questions',
        key: 'id',
      },
      onUpdate: 'cascade',
      onDelete: 'cascade',
      required: true,
    },
    order: {
      type: Sequelize.INTEGER,
      required: true,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Options'),
};

/* eslint-enable no-unused-vars, no-sequences, no-unused-expressions */
