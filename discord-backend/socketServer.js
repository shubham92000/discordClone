const authSocket = require('./middleware/authSocket');
const newConnectionHandler = require('./socketHandlers/newConnectionHandler');
const disconnectHandler = require('./socketHandlers/disconnectHandler');

const registerSockerServer = (server) => {
  const io = require('socket.io')(server, {
    cors: {
      origin: '*',
      method: ['GET', 'POST'],
    },
  });

  io.use((socket, next) => {
    authSocket(socket, next);
  });

  io.on('connection', (socket) => {
    console.log('user connected');
    console.log(socket.id);

    newConnectionHandler(socket, io);

    socket.on('disconnect', () => {
      disconnectHandler(socket);
    });
  });
};

module.exports = {
  registerSockerServer,
};
