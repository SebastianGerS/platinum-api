
import * as Vote from '../lib/Vote';

export default {
  list(req, res) {
    Vote.list({
      res,
      returnData: false,
      jsonData: true,
    });
  },

  create(req, res) {
    Vote.create({
      res,
      body: req.body,
    });
  },

};
