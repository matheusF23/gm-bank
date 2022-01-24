const Yup = require('yup');

class UserValidaton {
  static async validateInputData(data) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    return schema.isValid(data);
  }
}

module.exports = UserValidaton;
