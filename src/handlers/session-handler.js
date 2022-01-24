const SessionValidation = require('../validations/session-validation');
const SessionService = require('../services/session-service');

class SessionHandler {
  static async createSession(req, res) {
    try {
      const { email, password } = req.body;

      if (!(await SessionValidation.validateInputData({ email, password }))) {
        return res.status(400).json({ error: 'Validation fails.' });
      }

      const sessionData = await SessionService.createSession(email, password);

      return res.json(sessionData);
    } catch (err) {
      return res.status(err.status || 500).json({ error: err.message });
    }
  }
}

module.exports = SessionHandler;
