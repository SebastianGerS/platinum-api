import * as Answer from '../lib/Answer';

export default {
  list(req, res) {
    Answer.list({
      res,
      returnData: false,
      jsonData: true,
    })
  },

  findOne(req, res) {
    Answer.findOne({
      res,
      query: {
        id: req.params.id,
      },
    });
  },
}