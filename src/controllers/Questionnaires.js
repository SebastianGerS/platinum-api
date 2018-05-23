import * as Questionnaires from '../lib/Questionnaires';

export default {

  create(req, res) {
    Questionnaires.create({
      res,
      userId: req.user.dataValues.userId,
      body: req.body,
    });
  },

  find(req, res) {
    Questionnaires.findWithPage({
      res,
      query: {
        userId: req.user.dataValues.userId,
      },
      params: req.query,
    });
  },

  findOne(req, res) {
    Questionnaires.findOne({
      res,
      query: {
        id: req.params.questionnaireId,
      },
    });
  },

  update(req, res) {
    Questionnaires.update({
      res,
      body: req.body,
      userId: req.user.dataValues.userId,
      query: {
        id: req.params.questionnaireId,
      },
    });
  },

  destroy(req, res) {
    Questionnaires.destroy({
      res,
      userId: req.user.dataValues.userId,
      query: {
        id: req.params.questionnaireId,
      },
    });
  },
};
