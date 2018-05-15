process.env.NODE_ENV = 'test';
/* eslint-disable import/first, no-unused-vars, prefer-destructuring */
// import server from './server';
import chai from 'chai';
import chaiHttp from 'chai-http';
// import DB from './models';
import JWT from 'jsonwebtoken';

// app.get('/', (req, res) => res.status(200).send({
//   message: 'Welcome to Node Express API Boilerplate!',
// }));

// app.post('/sign-out', authBearer(), C.Sessions.signOut);
// app.get('/verify-token', authBearer(), C.Sessions.verifyToken);

// /* Users */
// app.get('/users', authBearer(), C.Users.list);
// app.get('/users/:userId', authBearer(), C.Users.find);
// app.put('/users/:userId', authBearer(), C.Users.update);

// /* Answer */
// app.get('/answer', C.Answer.list);
// app.post('/my-answer', C.Answer.create);
// /* Questionnaires */
// app.get('/questionnaires', authBearer(), C.Questionnaires.list);
// app.get('/questionnaires/:questionnaireId', authBearer(), C.Questionnaires.findOne);
// app.get('/my-questionnaires', authBearer(), C.Questionnaires.find);
// app.put('/my-questionnaires/:questionnaireId', authBearer(), C.Questionnaires.update);

// /* Questions */

// app.post('/questions', authBearer(), C.Questions.create);
// app.put('/questions/:questionId', authBearer(), C.Questions.update);
// app.delete('/questions/:questionId', authBearer(), C.Questions.destroy);

// /* Options */

// app.post('/options', authBearer(), C.Options.create);
// app.delete('/questions/:questionId/options/:optionId', authBearer(), C.Options.destroy);

// /* Tests */
// app.get('/tests', C.Tests.list);
// app.get('/tests/custom-method', C.Tests.customMethod);
// app.post('/tests', C.Tests.create);
// app.get('/tests/:id', C.Tests.find);
// app.patch('/tests/:id', C.Tests.update);
// app.put('/tests/:id', C.Tests.update);
// app.delete('/tests/:id', C.Tests.destroy);

// /* Polls */
// app.get('/polls', authBearer(), C.Polls.list);
// app.get('/my-polls', authBearer(), C.Polls.find);
// app.put('/my-polls/:pollId', authBearer(), C.Polls.update);
// app.delete('/my-polls/:pollId', authBearer(), C.Polls.destroy);
// app.get('/polls/:pollId', C.Polls.findOne);

const should = chai.should();

chai.use(chaiHttp);
describe('Routes', () => {
  let userId;
  let token;
  let questionnaireId;
  let pollId;
  let answerId;
  let questionId;
  let optionId;
  describe('POST /users', () => {
    it('It should create a user', (done) => {
      chai.request('http://localhost:7770') // get this to work with server
        .post('/users')
        .send({
          firstName: 'test',
          lastName: 'testerson',
          email: 'test.testerson@email.com',
          password: 'test1234',
          role: 'User',
          redirect: '/',
          status: 'Active',
          allowedPaths: ['/my-questionnaires', '/create-questionnaire'],
          excludedPaths: [],
        })
        .end((err, res) => {
          userId = res.body.userId;
          res.should.have.status(201);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe('POST /sign-in', () => {
    it('It should sign in user', (done) => {
      const formdata = {
        email: 'test.testerson@email.com',
        password: 'test1234',
      };
      token = JWT.sign(formdata, 'jwtsecretcode');
      chai.request('http://localhost:7770')
        .post('/sign-in')
        .send({
          token,
        })
        .end((err, res) => {
          token = res.body.token;
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe('POST /my-questionnaires', () => {
    it('It should create one questionnaire', (done) => {
      chai.request('http://localhost:7770')
        .post('/my-questionnaires')
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'test', type: 'premium',
        })
        .end((err, res) => {
          questionnaireId = res.body.id;
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe('GET /questionnaires/:questionnaireId', () => {
    it('It should get one questionnaire', (done) => {
      chai.request('http://localhost:7770')
        .get(`/questionnaires/${questionnaireId}`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe('POST /questions', () => {
    it('It should create one question', (done) => {
      chai.request('http://localhost:7770')
        .post('/questions')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'yes or no?', questionnaireId, type: 'select-one', order: 1, options: [{ name: 'Yes', order: 1 }, { name: 'No', order: 2 }],
        })
        .end((err, res) => {
          questionId = res.body.id;
          optionId = res.body.options[0].id;
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe('POST /my-polls', () => {
    it('It should create a poll', (done) => {
      chai.request('http://localhost:7770')
        .post('/my-polls')
        .set('Authorization', `Bearer ${token}`)
        .send({ questionnaireId })
        .end((err, res) => {
          pollId = res.body.data.id;
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });
  describe('POST /my-answer', () => {
    it('It should create a poll', (done) => {
      chai.request('http://localhost:7770')
        .post('/my-answer')
        .set('Authorization', `Bearer ${token}`)
        .send({ pollId })
        .end((err, res) => {
          answerId = res.body.data.id;
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });
  describe('POST /my-vote', () => {
    it('It should create a vote', (done) => {
      chai.request('http://localhost:7770') // get this to work with server
        .post('/my-vote')
        .send({
          optionIds: [optionId],
          questionId,
          pollId,
          answerId,
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });
  describe('DELETE /my-questionnaires', () => {
    it('It should delete one questionnaire', (done) => {
      chai.request('http://localhost:7770')
        .delete(`/my-questionnaires/${questionnaireId}`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe('DELETE /users/:userId', () => {
    it('It should delete a user', (done) => {
      chai.request('http://localhost:7770') // get this to work with server
        .delete(`/users/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
