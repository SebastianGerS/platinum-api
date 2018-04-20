'use strict',
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Polls', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      questionnaire: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Questionnaires',
            key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      link: {
        type: Sequelize.STRING,
        unique:true
        },
      qr_code: {
        type: Sequelize.STRING,
        unique:true
      },
      status: {
        type: Sequelize.ENUM('active', 'closed')
      },
      max_num_of_votes: {
        type: Sequelize.INTEGER
      },
      duration: {
        type: Sequelize.INTEGER,
        required: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      closedAt: {
        type: Sequelize.DATE
      },
    })
    .then(() => {
      queryInterface.addIndex('Polls', { fields: ['link', 'qr_code', 'status', 'duration'] })
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Polls')
  }
}
