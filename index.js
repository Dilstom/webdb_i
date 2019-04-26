const express = require('express');
const server = express();

server.use(express.json());

server.post('/characters', (req, res) => {});

server.listen(8000, () => console.log('Running on port 8000'));
