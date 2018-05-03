/* eslint-disable */
import DB from '../models';

function jsonVote(Vote) {
  return {
    id: Vote.id,
    questionId: Vote.questionId,
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
    optionId, questionId,
  } = body;

  DB.Vote
  .create({
    questionId, 
    Options: [{
      optionId
    }]   
  }, {
    include: [ 		{model: DB.Option, as: 'Options',through: {}},  ]
  }).then((Vote) => {
    const data = jsonVote(Vote);
    return res.status(200).send({
      message: 'something went right!',
      data,
    });
  })
  .catch((error) => {
    console.log(error);
    return res.status(400).send(error);
  });

}

// create function
// från vote, skapa en plats i ledger table mellan Options och Vote
