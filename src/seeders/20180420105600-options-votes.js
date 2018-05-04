/* eslint-disable no-unused-vars, no-sequences, no-unused-expressions,
no-use-before-define, no-param-reassign, no-console, func-names */

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('OptionVotes', [
    optionVote(2, 1, mockDateTime(20)),
    optionVote(3, 2, mockDateTime(20)),
    optionVote(17, 3, mockDateTime(20)),
    optionVote(1, 4, mockDateTime(20)),
    optionVote(3, 5, mockDateTime(20)),
    optionVote(18, 6, mockDateTime(20)),
    optionVote(1, 7, mockDateTime(20)),
    optionVote(4, 8, mockDateTime(20)),
    optionVote(18, 9, mockDateTime(20)),
    optionVote(1, 10, mockDateTime(20)),
    optionVote(4, 11, mockDateTime(20)),
    optionVote(18, 12, mockDateTime(20)),
    optionVote(2, 13, mockDateTime(20)),
    optionVote(3, 14, mockDateTime(20)),
    optionVote(18, 15, mockDateTime(20)),
    optionVote(2, 16, mockDateTime(20)),
    optionVote(4, 17, mockDateTime(20)),
    optionVote(18, 18, mockDateTime(20)),
    optionVote(2, 19, mockDateTime(20)),
    optionVote(3, 20, mockDateTime(20)),
    optionVote(18, 21, mockDateTime(20)),
    optionVote(2, 22, mockDateTime(20)),
    optionVote(3, 23, mockDateTime(20)),
    optionVote(17, 24, mockDateTime(20)),
    optionVote(1, 25, mockDateTime(20)),
    optionVote(4, 26, mockDateTime(20)),
    optionVote(18, 27, mockDateTime(20)),
    optionVote(1, 28, mockDateTime(20)),
    optionVote(4, 29, mockDateTime(20)),
    optionVote(18, 30, mockDateTime(20)),
    optionVote(1, 31, mockDateTime(20)),
    optionVote(4, 32, mockDateTime(20)),
    optionVote(18, 33, mockDateTime(20)),
    optionVote(1, 34, mockDateTime(20)),
    optionVote(4, 35, mockDateTime(20)),
    optionVote(18, 36, mockDateTime(20)),
    optionVote(1, 37, mockDateTime(20)),
    optionVote(3, 38, mockDateTime(20)),
    optionVote(18, 39, mockDateTime(20)),
    optionVote(1, 40, mockDateTime(20)),
    optionVote(4, 41, mockDateTime(20)),
    optionVote(17, 42, mockDateTime(20)),
    optionVote(7, 43, mockDateTime(20)),
    optionVote(9, 44, mockDateTime(20)),
    optionVote(7, 45, mockDateTime(20)),
    optionVote(10, 46, mockDateTime(20)),
    optionVote(8, 47, mockDateTime(20)),
    optionVote(10, 48, mockDateTime(20)),
    optionVote(8, 49, mockDateTime(20)),
    optionVote(9, 50, mockDateTime(20)),
    optionVote(7, 51, mockDateTime(20)),
    optionVote(10, 52, mockDateTime(20)),
    optionVote(7, 53, mockDateTime(20)),
    optionVote(10, 54, mockDateTime(20)),
    optionVote(5, 55, mockDateTime(20)),
    optionVote(5, 56, mockDateTime(20)),
    optionVote(5, 57, mockDateTime(20)),
    optionVote(6, 58, mockDateTime(20)),
    optionVote(6, 59, mockDateTime(20)),
    optionVote(6, 60, mockDateTime(20)),
    optionVote(11, 61, mockDateTime(20)),
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('OptionVotes', null, {}),
};

const Moment = require('moment');

function optionVote(optionId, voteId, date) {
  const newDate = new Date(date);
  const data = {
    optionId,
    voteId,
    createdAt: newDate,
    updatedAt: newDate,
  };

  console.log('[optionVote] ', data);

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
