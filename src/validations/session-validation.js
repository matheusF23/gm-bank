const Yup = require('yup');

class UserValidaton {
  static async validateCreateData(data) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    return schema.isValid(data);
  }

  static async validateGetBalanceData(userId) {
    const schema = Yup.object().shape({
      userId: Yup.string().required(),
    });

    return schema.isValid({ userId });
  }
}

module.exports = UserValidaton;
