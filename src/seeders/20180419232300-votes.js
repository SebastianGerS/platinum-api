/* eslint-disable no-unused-vars, no-sequences, no-unused-expressions,
no-use-before-define, no-param-reassign, no-console, func-names */

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Votes', [
    vote(1, '1', 1, mockDateTime(20)),
    vote(2, '1', 1, mockDateTime(20)),
    vote(9, '1', 1, mockDateTime(20)),
    vote(1, '1', 2, mockDateTime(20)),
    vote(2, '1', 2, mockDateTime(20)),
    vote(9, '1', 2, mockDateTime(20)),
    vote(1, '1', 3, mockDateTime(20)),
    vote(2, '1', 3, mockDateTime(20)),
    vote(9, '1', 3, mockDateTime(20)),
    vote(1, '1', 4, mockDateTime(20)),
    vote(2, '1', 4, mockDateTime(20)),
    vote(9, '1', 4, mockDateTime(20)),
    vote(1, '1', 5, mockDateTime(20)),
    vote(2, '1', 5, mockDateTime(20)),
    vote(9, '1', 5, mockDateTime(20)),
    vote(1, '1', 6, mockDateTime(20)),
    vote(2, '1', 6, mockDateTime(20)),
    vote(9, '1', 6, mockDateTime(20)),
    vote(1, '1', 7, mockDateTime(20)),
    vote(2, '1', 7, mockDateTime(20)),
    vote(9, '1', 7, mockDateTime(20)),
    vote(1, '1', 8, mockDateTime(20)),
    vote(2, '1', 8, mockDateTime(20)),
    vote(9, '1', 8, mockDateTime(20)),
    vote(1, '2', 9, mockDateTime(20)),
    vote(2, '2', 9, mockDateTime(20)),
    vote(9, '2', 9, mockDateTime(20)),
    vote(1, '2', 10, mockDateTime(20)),
    vote(2, '2', 10, mockDateTime(20)),
    vote(9, '2', 10, mockDateTime(20)),
    vote(1, '2', 11, mockDateTime(20)),
    vote(2, '2', 11, mockDateTime(20)),
    vote(9, '2', 11, mockDateTime(20)),
    vote(1, '2', 12, mockDateTime(20)),
    vote(2, '2', 12, mockDateTime(20)),
    vote(9, '2', 12, mockDateTime(20)),
    vote(1, '2', 13, mockDateTime(20)),
    vote(2, '2', 13, mockDateTime(20)),
    vote(9, '2', 13, mockDateTime(20)),
    vote(1, '2', 14, mockDateTime(20)),
    vote(2, '2', 14, mockDateTime(20)),
    vote(9, '2', 14, mockDateTime(20)),
    vote(4, '3', 15, mockDateTime(20)),
    vote(5, '3', 15, mockDateTime(20)),
    vote(4, '3', 16, mockDateTime(20)),
    vote(5, '3', 16, mockDateTime(20)),
    vote(4, '3', 17, mockDateTime(20)),
    vote(5, '3', 17, mockDateTime(20)),
    vote(4, '3', 18, mockDateTime(20)),
    vote(5, '3', 18, mockDateTime(20)),
    vote(4, '3', 19, mockDateTime(20)),
    vote(5, '3', 19, mockDateTime(20)),
    vote(4, '3', 20, mockDateTime(20)),
    vote(5, '3', 20, mockDateTime(20)),
    vote(3, '4', 21, mockDateTime(20)),
    vote(3, '4', 22, mockDateTime(20)),
    vote(3, '4', 23, mockDateTime(20)),
    vote(3, '4', 24, mockDateTime(20)),
    vote(3, '4', 25, mockDateTime(20)),
    vote(6, '5', 26, mockDateTime(20)),
    vote(7, '5', 26, mockDateTime(20)),
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Votes', null, {}),
};

const Moment = require('moment');

function vote(questionId, pollId, answerId, date) {
  const newDate = new Date(date);
  const data = {
    questionId,
    pollId,
    answerId,
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
