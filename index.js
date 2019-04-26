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

server.put('/characters/:id', (req, res) => {
 const changes = req.body;
 const { id } = req.params;
 // there is no need to pass all the fields for the records, only the fields that need to change and
 // knex will leave all other fields unchanged. Knex will do the right thing.
 db('characters')
  .where({ id: id }) // or .where('id', '=', id)
  .update(changes)
  // .update() method returns the number of records updated
  .then(count => {
   //count === number of records updated
   res.status(200).json(count);
  })
  .catch(err => {
   res.status(500).json(err);
  });
});

server.delete('/characters/:id', (req, res) => {
 const id = req.params;

 db(characters)
  .where({ id })
  .del()
  .then(count => {
   // count === number of records deleted
   res.status(200).json(count);
  })
  .catch(err => {
   res.status(500).json(err);
  });
});

server.listen(8000, () => console.log('Running on port 8000'));
