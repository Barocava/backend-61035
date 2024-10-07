import { Router } from 'express';
import { checkAuth } from '../middlewares/authJwt.js';
import { checkAdmin } from '../middlewares/checkAdmin.js';
import UserController from '../controllers/user.controllers.js';
const controller = new UserController();

const router = Router();

router.post('/register', controller.register);

router.post('/login', controller.login);

router.get('/current', checkAuth, controller.current);

//Esto es nuevo
router.get('/', [checkAuth, checkAdmin], controller.getAll);
router.delete('/', [checkAuth, checkAdmin], controller.deleteInactiveUsers);
router.post('/logout',checkAuth, controller.logout);

export default router;