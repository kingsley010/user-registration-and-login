import express from 'express';
import UserController from '../controllers/userController';

const router = express.Router();

const usercontroller = new UserController();

router.post('/signup', usercontroller.register);
router.post('/signin', usercontroller.login);

export default router;


