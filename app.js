require('dotenv').config();
const { APP_PORT } = process.env;
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const connectDB = require('./api/config/database');
const app = express();

connectDB();

app
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(cors());

app
  .use('/api/user', require('./api/components/user/usersRoute'))
  .use('/api/auth', require('./api/components/auth/authRoute'))
  .use('/api/profile', require('./api/components/profile/profileRoute'))
  .use('/api/post', require('./api/components/post/postRoute'));

app.listen(APP_PORT || 5000, (err) => {
  if (err) throw console.log(err);

  console.log(`Server started on port ${APP_PORT}.`);
});
