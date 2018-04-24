/* eslint-disable no-unused-vars, no-sequences, no-unused-expressions,
no-use-before-define, no-param-reassign, no-console, func-names */

module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    userRedirect(queryInterface, 'referrer@email.com', '/redux'),
    userRedirect(queryInterface, 'redirect@email.com', 'https://github.com/anthub-services/create-react-app-boilerplate'),
  ]),

  down: (queryInterface, Sequelize) => Promise.all([
    userRedirect(queryInterface, 'referrer@email.com', null),
    userRedirect(queryInterface, 'redirect@email.com', null),
  ]),
};

function userRedirect(queryInterface, email, redirect) {
  console.log('[User Redirect] ', redirect);
  return queryInterface.sequelize.query(`UPDATE "Users" SET "redirect"='${redirect}' WHERE "email"='${email}'`);
}
