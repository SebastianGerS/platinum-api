
import * as DB from '../models';
import * as Questions from './Questions';
import * as Questionnaires from './Questionnaires';

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

  return new Promise(resolve => DB.Questionnaire
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

          return returnData ? resolve(Options) : res.status(200).send({ message: 'Successfully created a new options!' });
        })
        .catch((error) => {
          console.log(error);

          return res.status(400).send(error);
        });
    }).catch((error) => {
      console.log(error);

      return res.status(400).send(error);
    }));
}
export async function update(data) {
  const {
    res,
    userId,
    questionId,
    questionnaireId,
    options,
    returnData,
  } = data;

  return new Promise((resolve) => {
    Promise.all(options.map(async (option) => {
      await DB.Option.findOne({ where: { id: option.id } })
        .then(async (Option) => {
          if (Option) {
            if (Option.questionId !== questionId) { return res.status(400).send({ message: 'You can\'t updated options that does not belong to this question' }); }
            await Promise.all([
              DB.Option.update({
                name: option.name,
                order: option.order,
                updatedAt: new Date(),
              }, {
                where: { id: option.id },
              })
                .catch((error) => {
                  console.log(error);
                }),
            ]).catch((error) => {
              console.log(error);
            });
          } else {
            await Promise.all([
              create({
                res,
                userId,
                questionId,
                questionnaireId,
                options: [option],
                returnData,
              }),
            ]).catch((error) => {
              console.log(error);
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    })).then(() => resolve(options));
  })
    .catch((error) => {
      console.log(error);
    });
}

export function destroy(options) {
  const {
    res, userId, optionId, questionId,
  } = options;
  Questions.find({
    res,
    returnData: true,
    query: {
      id: questionId,
    },
  }).then((Question) => {
    if (!Question) { return res.status(404).send({ message: 'The Question attached to you option does not exist' }); }
    Questionnaires.find({
      res,
      query: {
        id: Question.questionnaireId,
      },
      returnData: true,
    })
      .then((Questionnaire) => {
        if (userId !== Questionnaire.object[0].userId) { return res.status(400).send({ message: 'You can not delete options that are not yours' }); }

        DB.Option
          .destroy({ where: { id: optionId } })
          .then((DeletedOption) => {
            if (!DeletedOption) { return res.status(404).send({ message: 'The option you are trying to delete does not exist' }); }

            return res.status(200).send({ message: 'Successfully deleted a option!' });
          })
          .catch((error) => {
            console.log(error);

            return res.status(400).send(error);
          });
      });
  });
}
