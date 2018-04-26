/* eslint-disable no-unused-vars, no-sequences, no-unused-expressions,
no-use-before-define, no-param-reassign, no-console, func-names, import/first */


module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Polls', [
    poll('1', 1, 1, 'http://localhost:7771/polls/1', 'http://localhost:7771/polls/1', 'closed', 10, mockDateTime(20)),
    poll('2', 1, 1, 'http://localhost:7771/polls/2', 'http://localhost:7771/polls/2', 'closed', 60, mockDateTime(20)),
    poll('3', 2, 3, 'http://localhost:7771/polls/3', 'http://localhost:7771/polls/3', 'closed', 120, mockDateTime(20)),
    poll('4', 1, 2, 'http://localhost:7771/polls/4', 'http://localhost:7771/polls/4', 'closed', 5, mockDateTime(20)),
    poll('5', 3, 4, 'http://localhost:7771/polls/5', 'http://localhost:7771/polls/5', 'closed', 15, mockDateTime(20)),
    poll('6', 4, 5, 'http://localhost:7771/polls/6', 'http://localhost:7771/polls/6', 'closed', 240, mockDateTime(20)),
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Polls', null, {}),
};

const Moment = require('moment');

function poll(id, userId, questionnaireId, link, qrCode, status, duration, date) {
  const newDate = new Date();
  const closedDate = new Date(date);

  const data = {
    id,
    userId,
    questionnaireId,
    link,
    qrCode,
    status,
    maxNumOfVotes: null,
    duration,
    createdAt: newDate,
    updatedAt: newDate,
    closedAt: closedDate,
  };

  console.log('[Poll] ', data);

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

