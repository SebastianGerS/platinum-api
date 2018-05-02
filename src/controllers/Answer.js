import * as Answer from '../lib/Answer';

export default {
  list(req, res) {
    Answer.list({
      res,
      returnData: false,
      jsonData: true,
    });
  },

  findOne(req, res) {
    Answer.findOne({
      res,
      query: {
        pollId: req.params.pollId,
      },
    });
  },

  create(req, res) {
    Answer.create({
      res,
      body: req.body,
    });
  },
};
