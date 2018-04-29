/* eslint-disable import/no-extraneous-dependencies, no-use-before-define,
 prefer-destructuring, radix, no-unused-vars, consistent-return, no-shadow, no-console */

import _ from 'lodash';
import DB from '../models';
import { filters, pageCount, orderBy } from '../helpers/Data';
import { rand } from '../helpers/Math';
import * as Questions from './Questions';
import * as Polls from './Polls';

export function list(options) {
  const {
    res, returnData, jsonData,
  } = options;

  return DB.Questionnaire
    .findAll({})
    .then((Questionnaires) => {
      const data = jsonData ? jsonQuestionnaires(Questionnaires) : Questionnaires;
      if (returnData) return data;
      return res.status(data ? 200 : 404).send(data);
    })
    .catch((error) => {
      console.log(error);
      return returnData ? error : res.status(400).send(error);
    });
}

export function pages({ query }) {
  return DB.Questionnaire
    .count({
      col: 'id',
    })
    .then(count => pageCount(query, count));
}

export function find(options) {
  const { res, returnData, query } = options;

  return DB.Questionnaire
    .findAll({
      where: query,
      include: [{
        model: DB.Poll,
        as: 'Polls',
        where: { status: 'active' },
        required: false,
      }],
    })
    .then((Questionnaires) => {
      const json = Questionnaires ? jsonQuestionnaires(Questionnaires) : null;

      if (returnData) return { object: Questionnaires, json };
      return res.status(Questionnaires ? 200 : 404).send(json);
    })
    .catch((error) => {
      console.log(error);
      return returnData ? error : res.status(400).send(error);
    });
}

export function findOne(options) {
  const { res, returnData, query } = options;

  return DB.Questionnaire
    .findOne({
      where: query,
      include: [{
        model: DB.Question,
        as: 'Questions',
        separate: true,
        order: [['order', 'ASC']],
        include: [{
          model: DB.Option,
          as: 'Options',
          separate: true,
          order: [['order', 'ASC']],
        }],
      }],
    })
    .then((Questionnaire) => {
      const json = Questionnaire ? jsonQuestionnaire(Questionnaire) : null;

      if (returnData) return { object: Questionnaire, json };
      return res.status(Questionnaire ? 200 : 404).json(json);
    })
    .catch((error) => {
      console.log(error);
      return returnData ? error : res.status(400).send(error);
    });
}

export function create(options) {
  const { res, userId, body } = options;
  const {
    title, type,
  } = body;

  DB.Questionnaire
    .create({
      title,
      type,
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .then((Questionnaire) => {
      if (Questionnaire) { return res.status(200).send({ message: 'Successfully created a new questionnaire!' }); }
    })
    .catch((error) => {
      console.log(error);

      return res.status(400).send(error);
    });
}

export function update(options) {
  const {
    res, userId, body, query,
  } = options;
  const { title } = body;

  find({
    res,
    query,
    returnData: true,
  })
    .then((Questionnaire) => {
      if (userId !== Questionnaire.object[0].userId) { return res.status(400).send({ message: 'You can not update the title of this questionnaire...' }); }

      DB.Questionnaire.update({
        title,
        updatedAt: new Date(),
      }, {
        where: query,
      })
        .then(Questionnaire => res.status(200).send({ message: 'Successfully updated the title - woho!' }))
        .catch((error) => {
          console.log(error);

          return res.status(400).send(error);
        });
    });
}

export function destroy(options) {
  const {
    res, userId, query,
  } = options;

  find({
    res,
    query,
    returnData: true,
  })
    .then((Questionnaire) => {
      if (userId !== Questionnaire.object[0].userId) { return res.status(400).send({ message: 'You can not delete this questionnaire...' }); }

      DB.Questionnaire
        .destroy({ where: query })
        .then((Questionnaire) => {
          if (Questionnaire) { return res.status(200).send({ message: 'Successfully deleted a questionnaire!' }); }
        })
        .catch((error) => {
          console.log(error);

          return res.status(400).send(error);
        });
    });
}

function jsonQuestionnaires(Questionnaires) {
  return Questionnaires
    .map(Questionnaire => jsonQuestionnaire(Questionnaire));
}

function jsonQuestionnaire(Questionnaire) {
  const json = {
    id: Questionnaire.id,
    title: Questionnaire.title,
    type: Questionnaire.type,
    userId: Questionnaire.userId,
    createdAt: Questionnaire.createdAt,
  };
  if (Questionnaire.Questions) {
    json.questions = Questions.jsonQuestions(Questionnaire.Questions);
  }
  if (Questionnaire.Polls) {
    if (Questionnaire.Polls.status === 'acitve' || Questionnaire.Polls.status === undefined) {
      json.activePoll = Polls.jsonPolls(Questionnaire.Polls);
    }
  }
  return json;
}

/* eslint-enable import/no-extraneous-dependencies, no-use-before-define,
 prefer-destructuring, radix, no-unused-vars, consistent-return, no-shadow, no-console */
