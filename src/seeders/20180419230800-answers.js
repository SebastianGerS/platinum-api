/* eslint-disable no-unused-vars, no-sequences, no-unused-expressions,
no-use-before-define, no-param-reassign, no-console, func-names */

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Answers', [
    answer(1, mockDateTime(20)),
    answer(1, mockDateTime(20)),
    answer(1, mockDateTime(20)),
    answer(1, mockDateTime(20)),
    answer(1, mockDateTime(20)),
    answer(1, mockDateTime(20)),
    answer(1, mockDateTime(20)),
    answer(1, mockDateTime(20)),
    answer(2, mockDateTime(20)),
    answer(2, mockDateTime(20)),
    answer(2, mockDateTime(20)),
    answer(2, mockDateTime(20)),
    answer(2, mockDateTime(20)),
    answer(2, mockDateTime(20)),
    answer(3, mockDateTime(20)),
    answer(3, mockDateTime(20)),
    answer(3, mockDateTime(20)),
    answer(3, mockDateTime(20)),
    answer(3, mockDateTime(20)),
    answer(3, mockDateTime(20)),
    answer(4, mockDateTime(20)),
    answer(4, mockDateTime(20)),
    answer(4, mockDateTime(20)),
    answer(4, mockDateTime(20)),
    answer(4, mockDateTime(20)),
    answer(5, mockDateTime(20)),
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Answers', null, {}),
};

const Moment = require('moment');

function answer(poll, date) {
  const newDate = new Date(date);
  const data = {
    poll,
    createdAt: newDate,
    updatedAt: newDate,
  };

  console.log('[answer] ', data);

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
