const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');

const routes = require('./app/routes');
const db = require('./config/db');

const app = express();
const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));

(async function() {
  const client = await MongoClient.connect(
    db.url,
    { useNewUrlParser: true },
  );

  routes(app, client.db());

  app.listen(port, () => {
    console.log('We are live on ' + port);
  });
})().catch(err => console.log(err));
