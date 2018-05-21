import * as Polls from '../lib/Polls';

export default {
  list(req, res) {
    Promise
      .all([
        Polls.list({
          res,
          query: req.query,
          returnData: true,
          jsonData: true,
        }),
        Polls.pages({ query: req.query }),
      ])
      .then((promises) => {
        res.status(200).send({
          rows: promises[0],
          pages: promises[1],
        });
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  },

  find(req, res) {
    Polls.find({
      res,
      jsonData: true,
      query: {
        userId: req.user.dataValues.userId,
        status: 'closed',
      },
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
