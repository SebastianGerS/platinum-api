
import * as Vote from '../lib/Vote';

export default {
  list(req, res) {
    Vote.list({
      res,
      returnData: false,
      jsonData: true,
    });
  },
};
