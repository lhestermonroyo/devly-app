require('dotenv').config();
const express = require('express');
const { APP_PORT } = process.env;

const app = express();

app.get('/', (req, res) => {
  res.send('API Runnung!');
})

app.listen(APP_PORT || 3000, (err) => {
  if(err) throw console.log(err);
  console.log(`Server started on port ${APP_PORT}`);
});