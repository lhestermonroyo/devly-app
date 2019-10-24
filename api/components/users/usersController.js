const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const { validationResult } = require('express-validator');
const Users = require('./usersModel');

/**
 * Controller for request to create user
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The next function to execute
 */
async function createUser(req, res, next) {
  const errors = validationResult(req);
  const { 
    firstname,
    lastname,
    email,
    password,
  } = req.body;

  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let user = await Users.findOne({ email });
    
    if(user) {
      await res.status(400).json({ errors: [{ msg: 'User already exists.' }] });
    }
    
    const avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm',
    });

    user = new Users({
      firstname,
      lastname,
      email,
      password, 
      avatar,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    
    await user.save();
    await res.status(200).send('User has been registered.');
  } catch(err) {
    console.log(err);
    res.status(500).send(`Server error: ${err}`);
  }
}

module.exports = {
  createUser,
};