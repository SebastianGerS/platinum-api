/* eslint-disable */
import DB from '../models';

function jsonVote(Vote) {
  return {
    id: Vote.id,
    questionId: Vote.questionId,
    pollId: Vote.pollId,
    answerId: Vote.answerId,
    options: Vote.options
  };
}

function jsonVotes(Votes) {
  return Votes
    .map(Vote => jsonVote(Vote));
}

export function list(options) {
  const {
    res, returnData, jsonData,
  } = options;

  return DB.Vote
    .findAll({})
    .then((Votes) => {
      const data = jsonData ? jsonVotes(Votes) : Votes;

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
    optionIds, questionId, pollId, answerId
  } = body;

  DB.Vote
  .create({
    questionId,
    pollId,
    answerId,
  }).then((Vote) => {
    const newOptions = optionIds.map(optionId => {
      const newOption = {
        optionId,
        voteId: Vote.id,
      }

      return newOption;
    })
      DB.OptionVote
      .bulkCreate(newOptions)
      .then((OptionVote) => {
        Vote.options = OptionVote;
        const data = jsonVote(Vote);
        return res.status(200).send({
        message: 'something went right!',
        data,
      });
    });
  })
  .catch((error) => {
    console.log(error);
    return res.status(400).send(error);
  });

}
