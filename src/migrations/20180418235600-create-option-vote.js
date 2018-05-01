/* eslint-disable no-unused-vars, no-sequences, no-unused-expressions */

'use strict',

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('OptionVote', {
    optionId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Options',
        key: 'id',
      },
      onUpdate: 'cascade',
      onDelete: 'cascade',
    },
    voteId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Votes',
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('OptionVote'),
};

/* eslint-enable no-unused-vars, no-sequences, no-unused-expressions */
