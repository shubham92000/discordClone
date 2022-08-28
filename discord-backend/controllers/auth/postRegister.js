const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const postRegister = async (req, res) => {
  try {
    const { username, mail, password } = req.body;

    const userExists = await User.exists({ mail });

    if (userExists) {
      return res.status(409).send('Email already in use');
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      mail: mail.toLowerCase(),
      password: encryptedPassword,
    });

    const token = jwt.sign(
      {
        userId: user._id,
        mail: user.mail,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: process.env.TOKEN_EXPIRY,
      }
    );

    res.status(201).json({
      userDetails: {
        mail: user.mail,
        token: token,
        username: user.username,
        _id: user._id,
      },
    });
  } catch (err) {
    return res.status(500).send('Error occured. Please try again');
  }
};

module.exports = postRegister;
