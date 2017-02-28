const express = require('express');
const HOST = process.env.HOST;
const PORT = process.env.PORT || 8080;
const app = express();
require('dotenv').config();

const knex = require('knex')({
  client: 'pg',
  connection: process.env.DB_URL,
});

app.use(express.static('build'));

app.get('/users', (req, res) => {
  knex('users').select('id', 'username', 'password').then((users) => {
    res.json({
      users,
    });
  });
});
app.get('/entries', (req, res) => {
  knex('entries').select('mood', 'date', 'entry').then(entries => res.status(200).json({
    entries,
  }));
});
app.get('/entries/u', (req, res) => {
  const body = req.body;
  console.log(body);
  knex('entries').where({
    user_id: 1,
  }).select('mood', 'date', 'entry').then(entries => res.status(200).json({
    entries,
  }));
});
app.post('/users', (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      message: 'No request body',
    });
  }

  if (body.username === ' ') {
    return res.status(422).json({
      message: 'Missing field: username',
    });
  }

  if (body.password === ' ') {
    return res.status(422).json({
      message: 'Missing field: password',
    });
  }

  if (typeof body.username !== 'string') {
    return res.status(422).json({
      message: 'Incorrect field type: username',
    });
  }

  if (typeof body.password !== 'string') {
    return res.status(422).json({
      message: 'Incorrect field type: password',
    });
  }
  knex.insert({
    username: body.username,
    password: body.password,
  }).into('users').then((id) => {
    console.log(id);
    return res.status(201).json({});
  }).catch((e) => {
    console.error(e);
    res.sendStatus(500);
  });
});
app.post('/entries', (req, res) => {
  const body = req.body;
  console.log(body);
  if (!body) {
    return res.status(400).json({
      message: 'No request body',
    });
  }

  if (body.mood === ' ') {
    return res.status(422).json({
      message: 'Missing field: mood',
    });
  }

  if (body.entry === ' ') {
    return res.status(422).json({
      message: 'Missing field: entry',
    });
  }

  if (typeof body.entry !== 'string') {
    return res.status(422).json({
      message: 'Incorrect field type: entry',
    });
  }
  knex.insert({
    mood: body.mood,
    date: new Date(),
    entry: body.entry,
    user_id: body.user_id,
  }).into('entries').then((id) => {
    console.log(id);
    return res.status(201).json({});
  }).catch((e) => {
    console.error(e);
    res.sendStatus(500);
  });
});
app.put('/entries', (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      message: 'No request body',
    });
  }
  if (body.mood === ' ') {
    return res.status(422).json({
      message: 'Missing field: mood',
    });
  }
  if (typeof body.username !== 'string') {
    return res.status(422).json({
      message: 'Incorrect field type: mood',
    });
  }
  knex('entries').where({
    id: 1,
  }).update({
    mood: body.mood,
  }).then((count) => {
    console.log(count);
    return res.json({});
  }).catch((e) => {
    console.error(e);
    res.sendStatus(500);
  });
});
app.put('/users', (req, res) => {
  const body = req.body;
  knex('users').where({
    id: body.id,
  }).update({
    username: body.username,
  }).then((count) => {
    console.log(count);
    return res.json({});
  }).catch((e) => {
    console.error(e);
    res.sendStatus(500);
  });
});
app.delete('/users', (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      message: 'No request body',
    });
  }
  if (body.id === ' ') {
    return res.status(422).json({
      message: 'Missing field: ID',
    });
  }
  if (typeof body.id === isNaN) {
    return res.status(422).json({
      message: 'Incorrect field type: #',
    });
  }
  knex('users').where({
    id: body.id,
  }).del().then((count) => {
    console.log(count);
    return res.json({});
  }).catch((e) => {
    console.error(e);
    res.sendStatus(500);
  });
});
app.delete('/entries', (req, res) => {
  const body = req.body;
  if (body.id === null) {
    return res.status(404).json({
      message: 'entry not found',
    });
    knex('entries').where({
      id: body.id,
    }).del().then((count) => {
      console.log(count);
      return res.status(200).json({});
    }).catch((e) => {
      console.error(e);
      res.sendStatus(500);
    });
  }
});

function run_server() {
  app.listen(PORT, HOST, (err) => {
    if (err) return console.error(err);
    console.log(`Listening on port ${PORT}`);
  });
}

if (require.main === module) run_server();
