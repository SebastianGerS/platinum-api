'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Questionnaires', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      type: {
        allowNull: false,
        type: Sequelize.ENUM('basic', 'premium', 'onetime-premium'),
      },
      user: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Users',
            key: 'userId'
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
    .then(() => {
      queryInterface.addIndex('Questionnaires', { fields: ['title', 'type'] })
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Questionnaires')
  }
}
