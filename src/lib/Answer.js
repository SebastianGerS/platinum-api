import DB from '../models';

function jsonAnswer(Answer) {
  return {
    id: Answer.id,
    pollId: Answer.pollId,
  };
}

function jsonAnswers(Answers) {
  return Answers
    .map(Answer => jsonAnswer(Answer));
}

export function list(options) {
  const {
    res, returnData, jsonData,
  } = options;

  return DB.Answer
    .findAll({})
    .then((Answers) => {
      const data = jsonData ? jsonAnswers(Answers) : Answers;

      if (returnData) return data;

      return res.status(data ? 200 : 404).send(data);
    })
    .catch((error) => {
      console.log(error);

      return returnData ? error : res.status(400).send(error);
    });
}

export function create(options) {
  const { res, body } = options;
  const {
    pollId,
  } = body;

  console.log(body);
  DB.Answer
    .create({
      pollId,
    }).then((Answer) => {
      const data = jsonAnswer(Answer);
      return res.status(200).send({
        message: 'pollId has been sent!',
        data,
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).send(error);
    });
}
