import MongoClient from 'mongodb';

let connection;

export function connect(url, callback) {
  if (connection) {
    return callback();
  }

  return MongoClient.connect(url, (err, db) => {
    if (err) {
      return callback(err);
    }

    connection = db;

    return callback();
  });
}

export function get() {
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
