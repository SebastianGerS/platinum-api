'use strict',

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('QuestionsOptions', {
      questionId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Questions',
            key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      optionId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Options',
            key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('QuestionsOptions')
  }
}
