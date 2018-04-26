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
  const { res, returnData } = options;

  return DB.Questionnaire
    .findOne({})
    .then((Questionnaire) => {
      const json = Questionnaire ? jsonQuestionnaire(Questionnaire) : null;

      if (returnData) return { object: Questionnaire, json };
      return res.status(Questionnaire ? 200 : 404).send(json);
    })
    .catch((error) => {
      console.log(error);
      return returnData ? error : res.status(400).send(error);
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
