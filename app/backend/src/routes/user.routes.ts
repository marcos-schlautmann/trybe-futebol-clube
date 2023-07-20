import { Router } from 'express';
import Validations from '../middlewares/Validations';
import UserController from '../controllers/UserController';

const userController = new UserController();

const router = Router();

router.post(
  '/',
  Validations.Login,
  (req, res) => userController.findByEmail(req, res),
);

router.get(
  '/role',
  Validations.Token,
  (req, res) => userController.findRole(req, res),
);

export default router;
