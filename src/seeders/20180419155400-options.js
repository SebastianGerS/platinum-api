/* eslint-disable no-unused-vars, no-sequences, no-unused-expressions,
no-use-before-define, no-param-reassign, no-console, func-names */

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Options', [
    option('Yes', 1, 1, mockDateTime(20)),
    option('No', 1, 2, mockDateTime(20)),
    option('don\'t know', 2, 1, mockDateTime(20)),
    option('Why not?!', 2, 2, mockDateTime(20)),
    option('Yes...', 3, 1, mockDateTime(20)),
    option('No...', 3, 2, mockDateTime(20)),
    option('Cats', 4, 1, mockDateTime(20)),
    option('Dogs', 4, 2, mockDateTime(20)),
    option('Me!!!', 5, 1, mockDateTime(20)),
    option('Federer', 5, 2, mockDateTime(20)),
    option('Federer', 6, 1, mockDateTime(20)),
    option('Djokovic', 6, 2, mockDateTime(20)),
    option('Nadal', 7, 1, mockDateTime(20)),
    option('Federer', 7, 2, mockDateTime(20)),
    option('I\'m happy!', 8, 1, mockDateTime(20)),
    option('I\'m saad', 8, 2, mockDateTime(20)),
    option('Because i\'t fun!', 9, 1, mockDateTime(20)),
    option('I like to annoy people!', 9, 2, mockDateTime(20)),
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Options', null, {}),
};

const Moment = require('moment');

function option(name, question, order, date) {
  const newDate = new Date(date);
  const data = {
    name,
    question,
    order,
    createdAt: newDate,
    updatedAt: newDate,
  };

  console.log('[option] ', data);

  return data;
}

function mockDateTime(days) {
  return Moment().subtract(rand(days, days + 3), 'days')
    .subtract(rand(), 'hours')
    .subtract(rand(), 'minutes')
    .subtract(rand(), 'seconds')
    .format('YYYY-MM-DD HH:mm:ss');
}

function rand(min = 0, max = 60) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min)) + min;
}
