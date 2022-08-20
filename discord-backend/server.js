const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const server = http.createServer(app);

const PORT = process.env.PORT || process.env.API_PORT;
server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
