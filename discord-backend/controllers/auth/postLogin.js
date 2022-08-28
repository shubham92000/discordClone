const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const postLogin = async (req, res) => {
  try {
    const { mail, password } = req.body;

    const user = await User.findOne({ mail: mail.toLowerCase() });

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
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
        return res.status(200).json({
          userDetails: {
            mail: user.mail,
            token: token,
            username: user.username,
            _id: user._id,
          },
        });
      } else {
        return res.status(400).send('Invalid credentials');
      }
    } else {
      return res.status(400).send('Invalid credentials');
    }
  } catch (err) {
    return res.status(500).send('Something went wrong. Please try again.');
  }
};

module.exports = postLogin;
