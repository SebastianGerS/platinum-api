import _ from 'lodash';
import BCrypt from 'bcrypt';
import DB from '../models';
import * as Paths from '../lib/Paths';
import { filters, pageCount, orderBy } from '../helpers/Data';
import { rand } from '../helpers/Math';

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
        Answer.pages({ query: req.query }),
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
  }
}