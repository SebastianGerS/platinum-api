/* eslint-disable import/no-extraneous-dependencies, no-use-before-define,
 prefer-destructuring, radix, consistent-return, no-shadow, no-console */

import DB from '../models';
import * as Questions from './Questions';
import * as Polls from './Polls';

export function find(options) {
  const {
    res, returnData, query,
  } = options;

  return DB.Questionnaire
    .findAll({
      where: query,
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
export function findWithPage(options) {
  const {
    res, returnData, query, params,
  } = options;

  const { page, limit } = params;

  let offset;
  if (page) {
    offset = (page - 1) * limit;
  }

  find({
    res,
    returnData: true,
    query,
    params,
  }).then((Questionnaires) => {
    const morePages = (Questionnaires.json.length / (page * limit)) > 1;
    DB.Questionnaire
      .findAll({
        where: query,
        order: [['createdAt', 'DESC']],
        offset,
        limit,
        include: [{
          model: DB.Poll,
          as: 'Polls',
          where: { status: 'active' },
          required: false,
        },
        {
          model: DB.Question,
          as: 'Questions',
          required: false,
          include: [{
            model: DB.Option,
            as: 'Options',
            required: false,
          }],
        },
        ],
      })
      .then((Questionnaires) => {
        const json = Questionnaires ? jsonQuestionnaires(Questionnaires) : null;
        if (returnData) return { object: Questionnaires, json };
        return res.status(Questionnaires ? 200 : 404).json({ json, morePages });
      })
      .catch((error) => {
        console.log(error);
        return returnData ? error : res.status(400).send(error);
      });
  });
}


export function findOne(options) {
  const { res, returnData, query } = options;
  return DB.Questionnaire
    .findOne({
      where: { id: query.id },
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
          include: [{
            model: DB.Vote,
            as: 'Votes',
            through: { attributes: [] },
            where: { pollId: query.pollId },
            required: false,
          }],
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
      if (!Questionnaire) { return res.status(400).send({ message: 'Questionnaire could not be created' }); }

      const data = jsonQuestionnaire(Questionnaire);
      return res.status(200).json(data);
    }).then(() => res.status(200).send({ message: 'Successfully created new questionnaire!' }))
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
        .then(() => res.status(200).send({ message: 'Successfully updated the title - woho!' }))
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

export function jsonQuestionnaires(Questionnaires) {
  return Questionnaires
    .map(Questionnaire => jsonQuestionnaire(Questionnaire));
}

export function jsonQuestionnaire(Questionnaire) {
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
    if (Questionnaire.Polls[0]) {
      if (Questionnaire.Polls[0].dataValues.status === 'active') {
        json.activePoll = Polls.jsonPoll(Questionnaire.Polls[0]);
      }
    }
  }

  return json;
}

/* eslint-enable import/no-extraneous-dependencies, no-use-before-define,
 prefer-destructuring, radix, no-unused-vars, consistent-return, no-shadow, no-console */
