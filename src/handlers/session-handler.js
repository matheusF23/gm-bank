const SessionValidation = require('../validations/session-validation');
const SessionService = require('../services/session-service');

class SessionHandler {
  static async create(req, res) {
    try {
      const { email, password } = req.body;

      if (!(await SessionValidation.validateCreateData({ email, password }))) {
        return res.status(400).json({ error: 'Validation fails.' });
      }

      const sessionData = await SessionService.create(email, password);

      return res.json(sessionData);
    } catch (err) {
      return res.status(err.status || 500).json({ error: err.message });
    }
  }

  static async getBalance(req, res) {
    const { userId } = req.params;

    if (!(await SessionValidation.validateGetBalanceData(userId))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const balance = await SessionService.getBalance(userId);

    return res.json(balance);
  }
}

module.exports = SessionHandler;
