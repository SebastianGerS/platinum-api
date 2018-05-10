import { authBearer } from '../lib/Sessions';
import C from '../controllers';

export default (app) => {
  app.get('/', (req, res) => res.status(200).send({
    message: 'Welcome to Node Express API Boilerplate!',
  }));

  /* Sessions */
  app.post('/sign-in', C.Sessions.authenticate);
  app.post('/sign-out', authBearer(), C.Sessions.signOut);
  app.get('/verify-token', authBearer(), C.Sessions.verifyToken);

  /* Users */
  app.get('/users', authBearer(), C.Users.list);
  app.post('/users', C.Users.create);
  app.get('/users/:userId', authBearer(), C.Users.find);
  app.put('/users/:userId', authBearer(), C.Users.update);
  app.delete('/users/:userId', authBearer(), C.Users.destroy);

  /* Answer */
  app.get('/answer', C.Answer.list);
  app.post('/my-answer', C.Answer.create);

  /* Questionnaires */
  app.get('/questionnaires', authBearer(), C.Questionnaires.list);
  app.get('/questionnaires/:questionnaireId', authBearer(), C.Questionnaires.findOne);
  app.post('/my-questionnaires', authBearer(), C.Questionnaires.create);
  app.get('/my-questionnaires', authBearer(), C.Questionnaires.find);
  app.put('/my-questionnaires/:questionnaireId', authBearer(), C.Questionnaires.update);
  app.delete('/my-questionnaires/:questionnaireId', authBearer(), C.Questionnaires.destroy);

  /* Questions */

  app.post('/questions', authBearer(), C.Questions.create);
  app.delete('/questions/:questionId', authBearer(), C.Questions.destroy);
  /* Options */

  app.post('/options', authBearer(), C.Options.create);

  /* Tests */
  app.get('/tests', C.Tests.list);
  app.get('/tests/custom-method', C.Tests.customMethod); // Should be placed before other requests with dynamic values
  app.post('/tests', C.Tests.create);
  app.get('/tests/:id', C.Tests.find);
  app.patch('/tests/:id', C.Tests.update);
  app.put('/tests/:id', C.Tests.update);
  app.delete('/tests/:id', C.Tests.destroy);

  /* Polls */
  app.get('/polls', authBearer(), C.Polls.list);
  app.get('/my-polls', authBearer(), C.Polls.find);
  app.post('/my-polls', authBearer(), C.Polls.create);
  app.put('/my-polls/:pollId', authBearer(), C.Polls.update);
  app.delete('/my-polls/:pollId', authBearer(), C.Polls.destroy);
  app.get('/polls/:pollId', C.Polls.findOne);

  /* Vote */
  app.get('/vote', C.Vote.list);
  app.post('/my-vote', C.Vote.create);
};
