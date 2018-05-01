import DB from '../models';
import * as Paths from '../lib/Paths';

/* List start */
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
/* List end */

/* findOne start */
export function findOne(options) {
  const { res, returnData, query } = options;

  return DB.Answer
    .findOne({
      where: query,
      include: [{
        model: DB.Vote,
        as: 'Votes',
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
    .then((Answer) => {
      const json = Answer ? jsonAnswer(Answer) : null;

      if (returnData) return { object: Answer, json };
      return res.status(Answer ? 200 : 404).json(json);
    })
    .catch((error) => {
      console.log(error);
      return returnData ? error : res.status(400).send(error);
    });
}
/* Find end */

function jsonAnswers(Answers) {
  return Answers
    .map(Answer => jsonAnswer(Answer));
}

function jsonAnswer(Answer) {

  return {
    id: Answer.id,
    pollId: Answer.pollId,
  };
}