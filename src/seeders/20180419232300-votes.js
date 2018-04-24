/* eslint-disable no-unused-vars, no-sequences, no-unused-expressions,
no-use-before-define, no-param-reassign, no-console, func-names */

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Votes', [
    vote(1, 1, mockDateTime(20)),
    vote(2, 1, mockDateTime(20)),
    vote(9, 1, mockDateTime(20)),
    vote(1, 2, mockDateTime(20)),
    vote(2, 2, mockDateTime(20)),
    vote(9, 2, mockDateTime(20)),
    vote(1, 3, mockDateTime(20)),
    vote(2, 3, mockDateTime(20)),
    vote(9, 3, mockDateTime(20)),
    vote(1, 4, mockDateTime(20)),
    vote(2, 4, mockDateTime(20)),
    vote(9, 4, mockDateTime(20)),
    vote(1, 5, mockDateTime(20)),
    vote(2, 5, mockDateTime(20)),
    vote(9, 5, mockDateTime(20)),
    vote(1, 6, mockDateTime(20)),
    vote(2, 6, mockDateTime(20)),
    vote(9, 6, mockDateTime(20)),
    vote(1, 7, mockDateTime(20)),
    vote(2, 7, mockDateTime(20)),
    vote(9, 7, mockDateTime(20)),
    vote(1, 8, mockDateTime(20)),
    vote(2, 8, mockDateTime(20)),
    vote(9, 8, mockDateTime(20)),
    vote(1, 9, mockDateTime(20)),
    vote(2, 9, mockDateTime(20)),
    vote(9, 9, mockDateTime(20)),
    vote(1, 10, mockDateTime(20)),
    vote(2, 10, mockDateTime(20)),
    vote(9, 10, mockDateTime(20)),
    vote(1, 11, mockDateTime(20)),
    vote(2, 11, mockDateTime(20)),
    vote(9, 11, mockDateTime(20)),
    vote(1, 10, mockDateTime(20)),
    vote(2, 10, mockDateTime(20)),
    vote(9, 10, mockDateTime(20)),
    vote(1, 11, mockDateTime(20)),
    vote(2, 11, mockDateTime(20)),
    vote(9, 11, mockDateTime(20)),
    vote(1, 12, mockDateTime(20)),
    vote(2, 12, mockDateTime(20)),
    vote(9, 12, mockDateTime(20)),
    vote(4, 13, mockDateTime(20)),
    vote(5, 13, mockDateTime(20)),
    vote(4, 14, mockDateTime(20)),
    vote(5, 14, mockDateTime(20)),
    vote(4, 15, mockDateTime(20)),
    vote(5, 15, mockDateTime(20)),
    vote(4, 16, mockDateTime(20)),
    vote(5, 16, mockDateTime(20)),
    vote(4, 17, mockDateTime(20)),
    vote(5, 17, mockDateTime(20)),
    vote(4, 18, mockDateTime(20)),
    vote(5, 18, mockDateTime(20)),
    vote(3, 19, mockDateTime(20)),
    vote(3, 20, mockDateTime(20)),
    vote(3, 21, mockDateTime(20)),
    vote(3, 22, mockDateTime(20)),
    vote(3, 23, mockDateTime(20)),
    vote(3, 24, mockDateTime(20)),
    vote(6, 25, mockDateTime(20)),
    vote(7, 25, mockDateTime(20)),
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Votes', null, {}),
};

const Moment = require('moment');

function vote(question, answer, date) {
  const newDate = new Date(date);
  const data = {
    question,
    answer,
    createdAt: newDate,
    updatedAt: newDate,
  };

  console.log('[vote] ', data);

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
