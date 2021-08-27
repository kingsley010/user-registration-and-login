import express from 'express';
import UserController from '../controllers/userController';
import AuthMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

const usercontroller = new UserController();
const authmiddleware = new AuthMiddleware();

router.get('/all', usercontroller.homePage);
router.get('/user', authmiddleware.verifyToken, usercontroller.userPage);
router.post('/signup', usercontroller.register);
router.post('/signin', usercontroller.login);

export default router;


