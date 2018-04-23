'use strict',

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Votes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      question: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Questions',
            key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      answer: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Answers',
            key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Votes')
  }
}
