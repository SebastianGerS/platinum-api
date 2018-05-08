import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes';
import http from 'http';
import socket from 'socket.io';
import * as Polls from './lib/Polls';

/* eslint-disable no-unused-vars, no-sequences, no-unused-expressions,
no-use-before-define, no-param-reassign, no-console, func-names, global-require */


if (!process.env.PORT) {
  require('dotenv').config();
}

if (!process.env.PORT) {
  console.log('[api][port] 7770 set as default');
  console.log('[api][header] Access-Control-Allow-Origin: * set as default');
} else {
  console.log('[api][node] Loaded ENV vars from .env file');
  console.log(`[api][port] ${process.env.PORT}`);
  console.log(`[api][header] Access-Control-Allow-Origin: ${process.env.ALLOW_ORIGIN}`);
}

const app = express();
const server = http.Server(app);
const io = socket(server);

const port = process.env.PORT || 7770;
const allowOrigin = process.env.ALLOW_ORIGIN || '*';

server.listen(port, () => {
  console.log(`[api][listen] http://localhost:${port}`);
});

app.use(cors({
  origin: allowOrigin,
  credentials: true,
  allowedHeaders: 'X-Requested-With, Content-Type, Authorization',
  methods: 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
}));

app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(bodyParser.json());

routes(app);

io.on('connection', (client) => {
  client.on('/my-vote', (pollId) => {
    Polls.findOne({
      where: {
        id: pollId,
      },
      returnData: true,
    }).then((res) => {
      client.broadcast.emit(`/polls/${pollId}`, res);
    });
  });
});
