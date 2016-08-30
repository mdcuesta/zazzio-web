import express from 'express';
import path from 'path';

export default function configure(app) {
  app.use(express.static(path.join(__dirname, 'assets')));
}
