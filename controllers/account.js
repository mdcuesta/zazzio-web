import { Router } from 'express';
import * as DataProvider from '../utilities/data-provider';

const db = DataProvider;

/**
 * UserController
 */
export class AccountController {
  signUp(req, res) {
    // users collection
    const users = db.collection('users');
    // empty the collection
    users.remove({});

    // insert one
    users.insert({
      username: 'michael.dcuesta@gmail.com',
      password: 'Password',
    });

    // insert many
    users.insertMany([{
      username: 'thomaspenas@gmail.com',
      password: 'Password',
    }, {
      username: 'villamorrenan@gmail.com',
      password: 'Password',
    }]);

    // update one
    users.updateOne({ username: 'michael.dcuesta@gmail.com' }
    , { $set: { password: 'NewPassword' } });

    // find all
    users.find({}).toArray((err, docs) => {
      res.status(200).send({
        users: docs,
      });
    });
  }
}

const expressRouter = Router;
const router = expressRouter();
const controller = new AccountController();

router.post('/sign-up', controller.signUp.bind(controller));

export default router;
