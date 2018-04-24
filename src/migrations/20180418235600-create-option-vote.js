/* eslint-disable no-unused-vars, no-sequences, no-unused-expressions */

'use strict',

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('OptionsVotes', {
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
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('OptionsVotes'),
};

/* eslint-enable no-unused-vars, no-sequences, no-unused-expressions */
