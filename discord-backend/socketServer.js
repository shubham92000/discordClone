const registerSockerServer = (server) => {
  const io = require('socket.io')(server, {
    cors: {
      origin: '*',
      method: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('user connected');
    console.log(socket.id);
  });
};

module.exports = {
  registerSockerServer,
};
