const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');

require('dotenv').config();

const socketServer = require('./socketServer');
const app = express();
app.use(express.json());
app.use(cors());

// function modifyResponseBody(req, res, next) {
//   var oldSend = res.send;

//   res.send = function (data) {
//     // arguments[0] (or `data`) contains the response body
//     arguments[0] = 'modified : ' + arguments[0];
//     oldSend.apply(res, arguments);
//   };
//   next();
// }

// app.use(modifyResponseBody);
app.use('/api/auth', authRoutes);

const server = http.createServer(app);
socketServer.registerSockerServer(server);

const PORT = process.env.PORT || process.env.API_PORT;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(PORT, () => {
      console.log(`listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('database connection failed...');
    console.error(err);
  });
