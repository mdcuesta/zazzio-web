import * as DB from './utilities/data-provider';

const db = DB;

export default function configure() {
  db.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/zazzio', (err) => {
    if (err) {
      console.log('MongoDB server instance is not available');
      process.exit(1);
    }
  });
}
