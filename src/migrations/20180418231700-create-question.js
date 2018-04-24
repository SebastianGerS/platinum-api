/* eslint-disable no-unused-vars, no-sequences, no-unused-expressions */

'use strict',

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Questions', {
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
    type: {
      type: Sequelize.ENUM('select-one', 'multiselect', 'short-text'),
    },
    order: {
      type: Sequelize.INTEGER,
      required: true,
    },
    questionnaire: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Questionnaires',
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
  })
    .then(() => {
      queryInterface.addIndex('Questions', { fields: ['name', 'type'] });
    }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Questions'),
};

/* eslint-enable no-unused-vars, no-sequences, no-unused-expressions */
