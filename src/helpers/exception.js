class Exception {
  constructor(data) {
    this.message = data.message || 'Internal server error';
    this.status = data.status || 500;
  }
}

module.exports = Exception;
