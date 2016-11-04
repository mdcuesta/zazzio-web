import express from 'express';
import path from 'path';

const day = 86400000;
const week = day * 7;

export default function configure(app) {
  app.use(express.static(path.join(__dirname, 'assets'), { maxAge: week + 1 }));
}
