import * as Options from '../lib/Options';

export default {

  create(req, res) {
    Options.create({
      res,
      userId: req.user.dataValues.userId,
      questionId: req.body.questionId,
      questionnaireId: req.body.questionnaireId,
      options: req.body.options,
      returnData: false,
    });
  },
  destroy(req, res) {
    Options.destroy({
      res,
      userId: +req.user.dataValues.userId,
      optionId: req.params.optionId,
      questionId: req.body.questionId,
    });
  },
};
