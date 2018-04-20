'use strict',

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('OptionsVotes', {
      optionId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Options',
            key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      voteId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Votes',
            key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('OptionsVotes')
  }
}
