import express from 'express';

const server = express();

server.get('/', (request, response) => {
  return response.json({
    message: 'Server is running...',
  });
});

server.listen(3333, () => {
  console.log('Server is running...');
});
