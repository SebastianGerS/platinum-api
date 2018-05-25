/* eslint-disable import/no-extraneous-dependencies,
 no-console, consistent-return */

import DB from '../models';
import { pageCount } from '../helpers/Data';
import * as Questionnaires from './Questionnaires';
import uuidv4 from 'uuid/v4';

export function jsonPoll(Poll) {
  const newPoll = {
    id: Poll.id,
    userId: Poll.userId,
    questionnaireId: Poll.questionnaireId,
    link: Poll.link,
    qrCode: Poll.qrCode,
    status: Poll.status,
    maxNumOfVotes: Poll.maxNumOfVotes,
    duration: Poll.duration,
    createdAt: Poll.createdAt,
    updatedAt: Poll.updatedAt,
    closedAt: Poll.closedAt,
  };

  if (Poll.Questionnaire) {
    newPoll.questionnaire = Questionnaires.jsonQuestionnaire(Poll.Questionnaire);
  }

  return newPoll;
}

export function jsonPolls(Polls) {
  return Polls
    .map(Poll => jsonPoll(Poll));
}

export function pages({ query }) {
  return DB.Poll
    .count({
      col: 'id',
    })
    .then(count => pageCount(query, count));
}

export function find(options) {
  const {
    res, query, returnData, jsonData,
  } = options;
  return DB.Poll
    .findAll({
      where: query,
    })
    .then((Polls) => {
      const data = jsonData ? jsonPolls(Polls) : Polls;

      if (returnData) return data;

      return res.status(data ? 200 : 404).send(data);
    })
    .catch((error) => {
      console.log(error);

      return returnData ? error : res.status(400).send(error);
    });
}
export function findWithPage(options) {
  const {
    res, query, returnData, jsonData, params,
  } = options;

  const { page, limit } = params;

  let offset;

  if (page) {
    offset = (page - 1) * limit;
  }
  find({
    res,
    query,
    returnData: true,
    jsonData: true,
  }).then((PollsToBeCounted) => {
    const morePages = (PollsToBeCounted.length / (page * limit)) > 1;
    DB.Poll
      .findAll({
        where: query,
        offset,
        limit,
        include: [{
          model: DB.Questionnaire,
          as: 'Questionnaire',
        }],
        order: [[['closedAt', 'DESC']]],
      })
      .then((Polls) => {
        const json = jsonData ? jsonPolls(Polls) : Polls;

        if (returnData) return json;

        return res.status(json ? 200 : 404).send({ json, morePages });
      })
      .catch((error) => {
        console.log(error);

        return returnData ? error : res.status(400).send(error);
      });
  });
}

export function findOne(options) {
  const { res, where, returnData } = options;

  return new Promise(resolve => DB.Poll
    .findOne({
      where,
    })
    .then((Poll) => {
      Questionnaires.findOne({
        res,
        returnData: true,
        query: {
          id: Poll.questionnaireId,
          pollId: Poll.id,
        },
      }).then((Questionnaire) => {
        const data = {
          poll: {
            id: Poll.id,
            userId: Poll.userId,
            link: Poll.link,
            status: Poll.status,
            maxNumOfVotes: Poll.maxNumOfVotes,
            questionnaire: Questionnaire.json,
          },
        };
        if (returnData) {
          resolve(data.poll);
        }
        if (res) {
          return res.status(200).json(data);
        }
      });
    })
    .catch((error) => {
      console.log(error);


      return returnData ? error : res.status(400).send(error);
    }));
}

export function create(options) {
  const { res, userId, body } = options;
  const {
    questionnaireId,
  } = body;

  DB.Questionnaire
    .find({ where: { id: questionnaireId } })
    .then((Questionnaire) => {
      if (Questionnaire.dataValues.userId !== userId) { return res.status(401).send({ message: 'You can\'t create Polls from questionnaires that are not yours' }); }
      let maxNumOfVotes;
      if (Questionnaire.dataValues.type === 'basic') {
        maxNumOfVotes = 50;
      } else if (Questionnaire.dataValues.type === 'onetime-premium') {
        console.log('test');
        DB.Questionnaire
          .update({
            type: 'basic',
            updatedAt: new Date(),
          }, {
            where: { id: questionnaireId },
          })
          .catch((error) => {
            console.log(error);

            return res.status(400).send(error);
          });
      }

      const generatedId = uuidv4();

      DB.Poll
        .create({
          id: generatedId,
          userId,
          questionnaireId,
          maxNumOfVotes,
          link: `${process.env.ALLOW_ORIGIN}/polls/${generatedId}`,
          status: 'active',
          createdAt: new Date(),
          updatedAt: new Date(),
        }).then((Poll) => {
          const data = jsonPoll(Poll);
          return res.status(200).send({
            message: 'New Poll has been Activated!',
            data,
          });
        })
        .catch((error) => {
          console.log(error);

          return res.status(400).send(error);
        });
    });
}

export function update(options) {
  const {
    res, userId, query,
  } = options;

  find({
    res,
    query,
    returnData: true,
    jsonData: true,
  })
    .then((Poll) => {
      if (Poll[0].userId !== userId) { return res.status(401).send({ message: 'You can\'t update Polls that are not yours' }); }
      if (Poll[0].status !== 'active') { return res.status(403).send({ message: 'This poll is already closed' }); }

      DB.Poll
        .update({
          status: 'closed',
          updatedAt: new Date(),
          closedAt: new Date(),
        }, {
          where: query,
        })
        .catch((error) => {
          console.log(error);

          return res.status(400).send(error);
        });
      return res.status(200).send({ message: 'Your poll is now closed!' });
    })
    .catch((error) => {
      console.log(error);

      return res.status(400).send(error);
    });
}

export function destroy(options) {
  const { res, userId, query } = options;
  find({
    res,
    query,
    returnData: true,
    jsonData: true,
  })
    .then((Poll) => {
      if (Poll[0].userId !== userId) { return res.status(401).send({ message: 'You can\'t delete Polls that are not yours' }); }
      if (Poll[0].status === 'active') { return res.status(403).send({ message: 'You can\'t delete a active pole, please close it first' }); }
      DB.Poll
        .destroy({ where: query })
        .then(() => res.status(200).send())
        .catch((error) => {
          console.log(error);

          return res.status(400).send(error);
        });
      return res.status(200).send({ message: 'Poll deleted allong with all data' });
    })
    .catch((error) => {
      console.log(error);

      return res.status(400).send(error);
    });
}

/* eslint-enable import/no-extraneous-dependencies, no-use-before-define,
  prefer-destructuring, radix, no-unused-vars, consistent-return, no-shadow, no-console */

