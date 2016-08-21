'use strict';

import Controller from './controller';
import {Router} from 'express';
import * as DataProvider from '../utilities/data-provider';

const db = DataProvider;

/**
 * UserController
 */
export class AccountController extends Controller {
  signUp(req, res) {
    // users collection
    let users = db.collection('users');
    
    // empty the collection
    users.remove({});

    // insert one
    users.insert({
      username: 'michael.dcuesta@gmail.com',
      password: 'Password'
    });

    // insert many
    users.insertMany([{
      username: 'thomaspenas@gmail.com',
      password: 'Password'
    }, {
      username: 'villamorrenan@gmail.com',
      password: 'Password'
    }])

    // update one
    users.updateOne({ username : 'michael.dcuesta@gmail.com' }
    , { $set: { password : 'NewPassword' } });  

    // find all
    users.find({}).toArray(function(err, docs) {
      res.status(200).send({
        users: docs
      });
    });
  }
}


const router = Router();
const controller = new AccountController();

router.post('/sign-up', controller.signUp.bind(controller));

export default router;