import mongoose from 'mongoose';

const host = process.env.MONGO_HOST;
const port = process.env.MONGO_PORT;
const user = process.env.MONGO_USER;
const pass = process.env.MONGO_PASS;
const collection = process.env.MONGO_COLLECTION;

mongoose
  .connect(`mongodb://${host}:${port}`, { user, pass, dbName: collection, useNewUrlParser: true }, function (error) {
    if (error) {
      throw error;
    }
  })
  .then(() => {
    console.log('connected to database');
  });

export default mongoose;
