const BankAccountValidation = require('../validations/bank-account-validation');
const BankAccountService = require('../services/bank-account-service');

class BankAccountHandler {
  static async getBalance(req, res) {
    const { userId } = req.params;

    if (!(await BankAccountValidation.validateGetBalanceData(userId))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const balance = await BankAccountService.getBalance(userId);

    return res.json(balance);
  }
}

module.exports = BankAccountHandler;
