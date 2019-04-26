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

server.post('/characters', (req, res) => {
 const character = req.body;
 db
  .insert(character)
  .into('characters')
  // after a successful insert, knex returns an array with only one element: if of the last record inserted
  .then(ids => {
   res.status(201).json(ids);
  })
  .catch(err => {
   res.status(500).json(err);
  });
});


server.listen(8000, () => console.log('Running on port 8000'));
