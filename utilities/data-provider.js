import Mongoose from 'mongoose';
import Bluebird from 'bluebird';

const mongoose = Mongoose;
const bluebird = Bluebird;
let connection = null;

export function getConnection() {
  if (connection === null) {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/zazzio';
    const options = { promiseLibrary: bluebird };
    connection = mongoose.createConnection(uri, options);
  }
  return connection;
}

export function close(callback) {
  if (connection) {
    connection.close((err) => {
      connection = null;
      callback(err);
    });
  }
}

export function collection(name) {
  return connection.collection(name);
}
