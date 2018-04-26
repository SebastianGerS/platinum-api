import * as Questionnaires from '../lib/Questionnaires';

export default {
  list(req, res) {
    Promise
      .all([
        Questionnaires.list({
          res,
          query: req.query,
          returnData: true,
          jsonData: true,
        }),
        Questionnaires.pages({ query: req.query }),
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

  create(req, res) {
    // TODO: Create promises for paths creation and
    // sending temporary password to the new user
    // after the user record has beend created

    Questionnaires.create({
      res,
      title: req.body.title,
    });
  },

  find(req, res) {
    Questionnaires.find({
      res,
      where: {
        questionnaireId: req.params.questionnaireId,
      },
    });
  },

  update(req, res) {
    Questionnaires.update({
      res,
      body: req.body,
      questionnaireId: req.params.questionnaireId,
    });
  },

  destroy(req, res) {
    Questionnaires.destroy({
      res,
      questionnaireId: req.params.questionnaireId,
    });
  },
};
