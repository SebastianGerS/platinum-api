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
  update(req, res) {
    Questions.update({
      res,
      body: req.body,
      userId: req.user.dataValues.userId,
      questionId: +req.params.questionId,
    });
  },
  destroy(req, res) {
    Questions.destroy({
      res,
      userId: req.user.dataValues.userId,
    });
  },
};
