import * as Polls from '../lib/Polls';

export default {

  find(req, res) {
    Polls.findWithPage({
      res,
      jsonData: true,
      query: {
        userId: req.user.dataValues.userId,
        status: 'closed',
      },
      params: req.query,
    });
  },

  findOne(req, res) {
    Polls.findOne({
      res,
      where: {
        id: req.params.pollId,
      },
    });
  },
  create(req, res) {
    Polls.create({
      res,
      userId: req.user.dataValues.userId,
      body: req.body,
    });
  },
  update(req, res) {
    Polls.update({
      res,
      userId: req.user.dataValues.userId,
      query: {
        id: req.params.pollId,
      },
      body: req.body,
    });
  },
  destroy(req, res) {
    Polls.destroy({
      res,
      userId: req.user.dataValues.userId,
      query: {
        id: req.params.pollId,
      },
    });
  },
};
