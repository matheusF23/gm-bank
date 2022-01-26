const Yup = require('yup');

class BankAccountValidaton {
  static async validateInputData(userId) {
    const schema = Yup.object().shape({
      userId: Yup.string().required(),
    });

    return schema.isValid({ userId });
  }

  static async validateTransectionData(data) {
    const schema = Yup.object().shape({
      userId: Yup.string().required(),
      amount: Yup.number().required(),
    });

    return schema.isValid(data);
  }
}

module.exports = BankAccountValidaton;
