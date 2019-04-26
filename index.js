const express = require('express');

const knex = require('knex');

// const db = knex({
//  client: 'sqlite3',
//  connection: {
//   filename: './db.sqlite3',
//  },
//  useNullAsDefault: true,
// });

const knexConfig = require('./knexfile');
const db = knex(knexConfig.development); // to interact with our db

const server = express();

server.use(express.json());

server.post('/characters', (req, res) => {});

server.listen(8000, () => console.log('Running on port 8000'));
