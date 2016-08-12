'use strict';

import MongoClient from 'mongodb';

let connection;

export function connect(url, callback) {
  if (connection) {
    return callback();
  }

  MongoClient.connect(url, function(err, db) {
    if (err) {
      return callback(err)
    }

    connection = db;

    callback();
  });
};

export function get() {
  return connection;
};

export function close(callback) {
  if (connection) {
    connection.close(function(err, result) {
      connection = null
      callback(err);
    });
  }
};