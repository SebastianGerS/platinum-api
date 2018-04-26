import * as Answer from '../lib/Answer';

export default {
  list(req, res) {
    Promise
      .all([
        Answer.list({
          res,
          query: req.query,
          returnData: true,
          jsonData: true,
        }),
      ])
      .then((promises) => {
        res.status(200).send({
          message: "things are working",
          rows: promises[0],
          pages: promises[1],
        });
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  }
}