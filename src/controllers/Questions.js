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
};
