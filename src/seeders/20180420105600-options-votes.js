/* eslint-disable no-unused-vars, no-sequences, no-unused-expressions,
no-use-before-define, no-param-reassign, no-console, func-names */

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('OptionsVotes', [
    optionVote(1, 1),
    optionVote(3, 2),
    optionVote(17, 3),
    optionVote(1, 4),
    optionVote(3, 5),
    optionVote(18, 6),
    optionVote(1, 7),
    optionVote(4, 8),
    optionVote(18, 9),
    optionVote(1, 10),
    optionVote(4, 11),
    optionVote(17, 12),
    optionVote(2, 13),
    optionVote(4, 14),
    optionVote(17, 15),
    optionVote(2, 16),
    optionVote(4, 17),
    optionVote(18, 18),
    optionVote(2, 19),
    optionVote(3, 20),
    optionVote(18, 21),
    optionVote(2, 22),
    optionVote(3, 23),
    optionVote(17, 24),
    optionVote(1, 25),
    optionVote(4, 26),
    optionVote(18, 27),
    optionVote(1, 28),
    optionVote(4, 29),
    optionVote(18, 30),
    optionVote(1, 31),
    optionVote(4, 32),
    optionVote(18, 33),
    optionVote(1, 34),
    optionVote(4, 35),
    optionVote(18, 36),
    optionVote(1, 37),
    optionVote(4, 38),
    optionVote(18, 39),
    optionVote(1, 40),
    optionVote(4, 41),
    optionVote(18, 42),
    optionVote(7, 43),
    optionVote(9, 44),
    optionVote(7, 45),
    optionVote(10, 46),
    optionVote(8, 47),
    optionVote(10, 48),
    optionVote(8, 49),
    optionVote(9, 50),
    optionVote(7, 51),
    optionVote(10, 52),
    optionVote(7, 53),
    optionVote(10, 54),
    optionVote(5, 55),
    optionVote(5, 56),
    optionVote(5, 57),
    optionVote(6, 58),
    optionVote(6, 59),
    optionVote(6, 60),
    optionVote(11, 61),
    optionVote(14, 62),
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('OptionsVotes', null, {}),
};

const Moment = require('moment');

function optionVote(optionId, voteId) {
  const data = {
    optionId,
    voteId,
  };

  console.log('[optionVote] ', data);

  return data;
}
