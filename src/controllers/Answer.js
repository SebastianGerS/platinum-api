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
          })
        ])
        .then((promises) => {
          res.status(200).send({
            message: 'List of answers.',
            rows: promises[1],
            pages: promises[1],
          });
        })
        .catch((error) => {
            message: 'There was an error.',
          res.status(400).send(error);
        });
    }
}