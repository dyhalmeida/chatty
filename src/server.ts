import express from 'express';
import './database';
import { routes } from './routes';

const server = express();

server.use(express.json());

server.use(routes);

server.get('/', (request, response) => {
  return response.json({
    message: 'Server is running...',
  });
});

server.listen(3333, () => {
  console.log('Server is running...');
});
