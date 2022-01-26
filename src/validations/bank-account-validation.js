const Yup = require('yup');

class BankAccountValidaton {
  static async validateGetBalanceData(userId) {
    const schema = Yup.object().shape({
      userId: Yup.string().required(),
    });

    return schema.isValid({ userId });
  }

  static async validateDepositData(data) {
    const schema = Yup.object().shape({
      userId: Yup.string().required(),
      amount: Yup.number().required(),
    });

    return schema.isValid(data);
  }
}

module.exports = BankAccountValidaton;
