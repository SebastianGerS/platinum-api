import * as DB from '../models';
import * as Options from './Options';
import * as Questionnaires from './Questionnaires';
/* eslint-disable consistent-return, no-console */
export function jsonQuestion(Question) {
  const question = {
    id: Question.id,
    questionnaireId: Question.questionnaireId,
    name: Question.name,
    type: Question.type,
    order: Question.order,
  };

  if (Question.Options) {
    question.options = Options.jsonOptions(Question.Options);
  }
  return question;
}

export function jsonQuestions(Questions) {
  return Questions
    .map(Question => jsonQuestion(Question));
}
export function find(options) {
  const { res, returnData, query } = options;
  return DB.Question
    .findOne({
      where: query,
    })
    .then((Question) => {
      const json = Question ? jsonQuestion(Question) : null;

      if (returnData) return json;
      return res.status(Question ? 200 : 404).json(json);
    })
    .catch((error) => {
      console.log(error);
      return returnData ? error : res.status(400).send(error);
    });
}

export function create(data) {
  const {
    res, userId, body, returnData,
  } = data;

  const {
    name, questionnaireId, type, order, options,
  } = body;

  DB.Questionnaire
    .findById(questionnaireId)
    .then((Questionnaire) => {
      if (!Questionnaire) { return res.status(400).send({ message: 'The questionnaire you tried to create questions to does not exist' }); }
      if (Questionnaire.userId !== userId) { return res.status(401).send({ message: 'You can\'t create questions for questionnaire that are not yours' }); }

      DB.Question
        .create({
          name,
          questionnaireId,
          type,
          order,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .then((Question) => {
          if (!Question) { return res.status(400).send({ message: 'Question could not be created' }); }
          if (!options) { return res.status(200).send({ message: 'new Question was created' }); }
          Options.create({
            res,
            userId,
            questionId: Question.id,
            questionnaireId,
            options,
            returnData,
          });
        }).then(Question => (returnData ? Question : res.status(200).send({ message: 'Successfully created a new question with options!' })))
        .catch((error) => {
          console.log(error);

          return res.status(400).send(error);
        });
    })
    .catch((error) => {
      console.log(error);

      return res.status(400).send(error);
    });
}

export function update(options) {
  const {
    res, userId, body, questionId,
  } = options;

  const { name } = body;

  find({
    res,
    returnData: true,
    query: {
      id: questionId,
    },
  }).then((Question) => {
    if (!Question) { return res.status(404).send({ message: 'The question you are trying update does not exist' }); }

    Questionnaires.find({
      res,
      query: {
        id: Question.questionnaireId,
      },
      returnData: true,
    })
      .then((Questionnaire) => {
        if (userId !== Questionnaire.object[0].userId) { return res.status(400).send({ message: 'You can not update questions that someone else has created' }); }

        DB.Question.update({
          name,
          updatedAt: new Date(),
        }, {
          where: { id: questionId },
        })
          .then(() => res.status(200).send({ message: 'Successfully updated the name of the question' }))
          .catch((error) => {
            console.log(error);

            return res.status(400).send(error);
          });
      });
  });
}

export function destroy(options) {
  const {
    res, userId, questionId,
  } = options;
  find({
    res,
    returnData: true,
    query: {
      id: questionId,
    },
  }).then((Question) => {
    if (!Question) { return res.status(404).send({ message: 'The question you are trying to delete does not exist' }); }
    Questionnaires.find({
      res,
      query: {
        id: Question.questionnaireId,
      },
      returnData: true,
    })
      .then((Questionnaire) => {
        console.log(Questionnaire);
        if (userId !== Questionnaire.object[0].userId) { return res.status(400).send({ message: 'You can not delete this questions that are not yours' }); }

        DB.Question
          .destroy({ where: { id: questionId } })
          .then((DeletedQuestion) => {
            if (DeletedQuestion) { return res.status(200).send({ message: 'Successfully deleted a question!' }); }
          })
          .catch((error) => {
            console.log(error);

            return res.status(400).send(error);
          });
      });
  });
}

