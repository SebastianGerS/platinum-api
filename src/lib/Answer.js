import _ from 'lodash';
import BCrypt from 'bcrypt';
import DB from '../models';
import * as Paths from '../lib/Paths';
import { filters, pageCount, orderBy } from '../helpers/Data';
import { rand } from '../helpers/Math';

export function list(options) {
  const {
    res, returnData, jsonData,
  } = options;

  return DB.Answer
    .findAll({})
    .then((Answers) => {
      const data = jsonData ? jsonAnswers(Answers) : Answers;
      if (returnData) return data;
      return res.status(data ? 200 : 404).send(data);
    })
    .catch((error) => {
      console.log(error);
      return returnData ? error : res.status(400).send(error);
    });
}