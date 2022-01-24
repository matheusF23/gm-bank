const jwt = require('jsonwebtoken');
const authConfig = require('../configs/auth');

const Exception = require('../helpers/exception');

const User = require('../models/user-model');
const UserService = require('./user-service');

class SessionService {
  static async createSession(email, password) {
    const user = await User.findByEmail(email);

    if (!user) {
      throw new Exception({ status: 401, message: 'User not found.' });
    }

    if (!(await UserService.checkPassword(password, user))) {
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
