import { Router } from 'express';
import { checkAuth } from '../middlewares/authJwt.js';
import UserController from '../controllers/user.controllers.js';
const controller = new UserController();

const router = Router();

router.post('/register', controller.register);

router.post('/login', controller.login);

router.get('/current', checkAuth, controller.current);

export default router;