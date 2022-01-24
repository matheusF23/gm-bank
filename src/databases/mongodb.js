const mongoose = require('mongoose');

let connection = null;

class MongoDB {
  static createConnection() {
    const options = {
      dbName: process.env.MONGO_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      poolSize: 5,
      serverSelectionTimeoutMS: 15000,
      socketTimeoutMS: 20000,
      connectTimeoutMS: 15000,
    };

    return mongoose.createConnection(
      `mongodb://${process.env.MONGO_HOST}`,
      options
    );
  }

  static startEvents() {
    connection.on('disconnected', () => {
      connection = MongoDB.createConnection();
    });

    connection.on('error', () => mongoose.disconnect());

    process.on('SIGINT', () => {
      mongoose.disconnect((err) => {
        process.exit(err ? 1 : 0);
      });
    });

    process.on('message', (msg) => {
      if (msg === 'shutdown') {
        mongoose.disconnect((err) => {
          process.exit(err ? 1 : 0);
        });
      }
    });
  }

  static getOrCreateConnection() {
    if (!connection) {
      connection = MongoDB.createConnection();
      MongoDB.startEvents();
    }

    return connection;
  }
}

module.exports = MongoDB;
