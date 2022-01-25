const Yup = require('yup');

class SessionValidaton {
  static async validateInputData(data) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    return schema.isValid(data);
  }
}

module.exports = SessionValidaton;
