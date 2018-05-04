import * as DB from '../models';
import * as Options from './Options';
/* eslint-disable consistent-return, no-console */
export function jsonQuestion(Question) {
  return {
    id: Question.id,
    questionnaireId: Question.questionnaireId,
    name: Question.name,
    type: Question.type,
    order: Question.order,
    options: Options.jsonOptions(Question.Options),
  };
}

export function jsonQuestions(Questions) {
  return Questions
    .map(Question => jsonQuestion(Question));
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
