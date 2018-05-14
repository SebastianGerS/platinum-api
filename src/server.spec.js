process.env.NODE_ENV = 'test';
process.env.ALLOW_ORIGIN = 'http://localhost:7770';
/* eslint-disable import/first, no-unused-vars */
// import server from './server';
import chai from 'chai';
import chaiHttp from 'chai-http';
// import DB from './models';

const should = chai.should();

chai.use(chaiHttp);
describe('DB.Vote', () => {
  // beforeEach((done) => {
  //   DB.Vote.destroy({
  //     where: { id: voteId },
  //   }).then(() => {
  //     done();
  //   });
  // });
  describe('GET /vote', () => {
    it('It should get all the votes', (done) => {
      chai.request('http://localhost:7770') // get this to work with server
        .get('/vote')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });

  describe('create /my-vote', () => {
    it('It should get all the votes', (done) => {
      chai.request('http://localhost:7770') // get this to work with server
        .post('/my-vote')
        .send({
          optionIds: [1],
          questionId: 1,
          pollId: 1,
          answerId: 1,
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });
});
