
import * as DB from '../models';

/* eslint-disable consistent-return, no-console */

export function jsonOption(Option) {
  return {
    id: Option.id,
    questionId: Option.questionId,
    name: Option.name,
    order: Option.order,
    votes: Option.Votes.length,
  };
}

export function jsonOptions(Options) {
  return Options
    .map(Option => jsonOption(Option));
}

export function create(data) {
  const {
    res, userId, questionId, questionnaireId, options, returnData,
  } = data;

  DB.Questionnaire
    .findById(questionnaireId)
    .then((Questionnaire) => {
      if (!Questionnaire) { return res.status(400).send({ message: 'The questionnaire you tried to create options for does not exist' }); }
      if (Questionnaire.userId !== userId) { return res.status(401).send({ message: 'You can\'t create options for  questions that are not yours' }); }

      const newOptions = options.map((option) => {
        const newOption = option;
        newOption.createdAt = new Date();
        newOption.updatedAt = new Date();
        newOption.questionId = questionId;
        return newOption;
      });

      DB.Option
        .bulkCreate(newOptions)
        .then(() => DB.Option.findAll({ where: { questionId } }))
        .then((Options) => {
          if (!Options) { return res.status(400).send({ message: 'Options could not be created' }); }

          return returnData ? Options : res.status(200).send({ message: 'Successfully created a new options!' });
        })
        .catch((error) => {
          console.log(error);

          return res.status(400).send(error);
        });
    }).catch((error) => {
      console.log(error);

      return res.status(400).send(error);
    });
}
