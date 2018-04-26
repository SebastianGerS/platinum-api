/* eslint-disable import/no-extraneous-dependencies, no-use-before-define,
 prefer-destructuring, radix, no-unused-vars, consistent-return, no-shadow, no-console */

import _ from 'lodash';
import DB from '../models';
import * as Paths from '../lib/Paths';
import { filters, pageCount, orderBy } from '../helpers/Data';
import { rand } from '../helpers/Math';

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
    .findAll({ where: query })
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

export function create(options) {
  const { res, body } = options;
  const {
    title, type, userId,
  } = body;

  DB.Questionnaire
    .create({
      title,
      type,
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .catch((error) => {
      console.log(error);

      return res.status(400).send(error);
    });
}

function jsonQuestionnaires(Questionnaires) {
  return Questionnaires
    .map(Questionnaire => jsonQuestionnaire(Questionnaire));
}

function jsonQuestionnaire(Questionnaire) {
  return {
    id: Questionnaire.id,
    title: Questionnaire.title,
    type: Questionnaire.type,
    userId: Questionnaire.userId,
    createdAt: Questionnaire.createdAt,
    updatedAt: Questionnaire.updatedAt,
  };
}

/* eslint-enable import/no-extraneous-dependencies, no-use-before-define,
 prefer-destructuring, radix, no-unused-vars, consistent-return, no-shadow, no-console */
