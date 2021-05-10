import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import path from 'path';
import './database';
import { routes } from './routes';

const server = express();

/** Habilitando a view engine e arquivos públicos */
server.set('views', path.join(__dirname, '..', 'public'));
server.set('view engine', 'html');
server.engine('html', require('ejs').renderFile);
server.use(express.static(path.join(__dirname, '..', 'public')));

server.get('/pages/client', (_, response) => {
  return response.render('html/client.html');
});

server.get('/pages/admin', (_, response) => {
  return response.render('html/admin.html');
});

server.use(express.json());

server.use(routes);

server.get('/', (request, response) => {
  return response.json({
    message: 'Server is running...',
  });
});

const http = createServer(server);
const io = new Server(http);

export { http, io };
