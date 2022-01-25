const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const authConfig = require('../configs/auth');

const Exception = require('../helpers/exception');

const User = require('../models/user-model');

class SessionService {
  static async checkPassword(password, user) {
    return bcrypt.compare(password, user.password_hash);
  }

  static async create(email, password) {
    const user = await User.findByEmail(email);

    if (!user) {
      throw new Exception({ status: 401, message: 'User not found.' });
    }

    if (!(await SessionService.checkPassword(password, user))) {
      throw new Exception({ status: 401, message: 'Password does not match' });
    }

    return {
      user: {
        userId: user.userId,
        name: user.name,
        email: user.email,
      },
      token: jwt.sign({ id: user.userId }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    };
  }
}

module.exports = SessionService;
