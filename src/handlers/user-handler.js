const UserValidation = require('../validations/user-validation');
const UserService = require('../services/user-service');

class UserHandler {
  /*
   * params: name, email, password
   */
  static async store(req, res) {
    try {
      const { name, email, password } = req.body;

      if (!UserValidation.validateInputData({ name, email, password })) {
        return res.status(400).json({ error: 'Validation fails.' });
      }

      const userData = await UserService.createUser(name, email, password);

      return res.json(userData);
    } catch (err) {
      return res.status(err.status || 500).json({ error: err.message });
    }
  }
}

module.exports = UserHandler;
