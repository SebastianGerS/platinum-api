import * as Answer from '../lib/Answer';

export default {
  list(req, res) {
    Answer.list({
      res,
      returnData: false,
      jsonData: true,
    });
  },

  create(req, res) {
    Answer.create({
      res,
      body: req.body,
    });
  },
};
