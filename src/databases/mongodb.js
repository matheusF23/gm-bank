import mongoose from 'mongoose';

class MongoDB {
  static createConnection() {
    const options = {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    };

    return mongoose.connect(`mongodb://${process.env.MONGO_HOST}`, options);
  }
}

export default MongoDB;
