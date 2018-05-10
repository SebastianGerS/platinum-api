import * as Questions from '../lib/Questions';

export default {

  create(req, res) {
    Questions.create({
      res,
      userId: req.user.dataValues.userId,
      body: req.body,
      returnData: false,
    });
  },
  destroy(req, res) {
    Questions.destroy({
      res,
      userId: req.user.dataValues.userId,
    });
  },
  update(req, res) {
    Questions.update({
      res,
      body: req.body,
      userId: req.user.dataValues.userId,
      questionnaireId: req.params.questionnaireId,
      questionId: req.params.questionId,
    });
  },
};
