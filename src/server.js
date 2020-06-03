import express from 'express';
import { resolve } from 'path';
import routes from './Routes';
import './database';
class Server {
  constructor() {
    this.server = express();
    this.middleware();
    this.routes();
  }

  middleware() {
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(resolve(__dirname, '..', 'tmp', 'uploads'))
    );
    this.server.use(
      '/avatars',
      express.static(resolve(__dirname, '..', 'tmp', 'avatars'))
    );
  }

  routes() {
    this.server.use(routes);
  }
}

export default new Server().server;
