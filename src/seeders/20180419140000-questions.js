'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Questions', [
      question('Do you Like Questions?', 'select-one',1 ,1, mockDateTime(20)),
      question('Why?', 'select-one', 2, 1, mockDateTime(20)),
      question('Do you know who you are?', 'select-one', 1, 2, mockDateTime(20)),
      question('Which do you prefer?', 'select-one', 1, 3, mockDateTime(20)),
      question('Who is the greatest?', 'select-one', 2, 3, mockDateTime(20)),
      question('Who won the 2017 Wimbeldon final?', 'select-one', 1, 4, mockDateTime(20)),
      question('Who won the 2007 Wimbeldon final?', 'select-one', 2, 4, mockDateTime(20)),
      question('Which mood are you in to day?', 'select-one', 1, 5, mockDateTime(20)),
      question('Why do you ask questions?', 'select-one',3 ,1, mockDateTime(20))
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Question', null, {})
  }
}

const Moment = require('moment')

function question(name, type, order ,questionnaire, date,) {
  const newDate = new Date(date)
  const data = {
    name,
    type,
    order,
    questionnaire,
    createdAt: newDate,
    updatedAt: newDate
  }

  console.log('[Questions] ', data)

  return data
}

function mockDateTime(days) {
  return Moment().subtract(rand(days, days + 3), 'days')
                 .subtract(rand(), 'hours')
                 .subtract(rand(), 'minutes')
                 .subtract(rand(), 'seconds')
                 .format('YYYY-MM-DD HH:mm:ss')
}

function rand(min=0, max=60) {
  min = Math.ceil(min)
  max = Math.floor(max)

  return Math.floor(Math.random() * (max - min)) + min
}
