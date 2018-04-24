/* eslint-disable no-unused-vars, no-sequences, no-unused-expressions */

'use strict',

module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn('Users', 'redirect', { type: Sequelize.STRING, defaultValue: '' }),
  ]),

  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.removeColumn('Users', 'redirect'),
  ]),
};

/* eslint-enable no-unused-vars, no-sequences, no-unused-expressions */
