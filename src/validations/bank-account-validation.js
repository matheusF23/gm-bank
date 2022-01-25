const Yup = require('yup');

class BankAccountValidaton {
  static async validateGetBalanceData(userId) {
    const schema = Yup.object().shape({
      userId: Yup.string().required(),
    });

    return schema.isValid({ userId });
  }
}

module.exports = BankAccountValidaton;
