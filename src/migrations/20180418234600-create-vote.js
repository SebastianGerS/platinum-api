/* eslint-disable no-unused-vars, no-sequences, no-unused-expressions */

'use strict',

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Votes', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    questionId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Questions',
        key: 'id',
      },
      onUpdate: 'cascade',
      onDelete: 'cascade',
    },
    pollId: {
      type: Sequelize.STRING,
      references: {
        model: 'Polls',
        key: 'id',
      },
      onUpdate: 'cascade',
      onDelete: 'cascade',
    },
    answerId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Answers',
        key: 'id',
      },
      onUpdate: 'cascade',
      onDelete: 'cascade',
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Votes'),
};

/* eslint-enable no-unused-vars, no-sequences, no-unused-expressions */
