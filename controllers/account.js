'use strict';

import Controller from './controller';
import {Router} from 'express';

/**
 * UserController
 */
export class AccountController extends Controller {
  signUp(req, res) {

  }
}


const router = Router();
const controller = new AccountController();

router.post('/sign-up', controller.signUp.bind(controller));

export default router;