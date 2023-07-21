import { Router } from 'express';
import MatchController from '../controllers/MatchController';
import Validations from '../middlewares/Validations';

const matchController = new MatchController();

const router = Router();

router.get('/', (req, res) => matchController.findAllMatches(req, res));
router.patch(
  '/:id/finish',
  Validations.Token,
  (req, res) => matchController.finishMatches(req, res),
);
router.patch(
  '/:id',
  Validations.Token,
  (req, res) => matchController.updateMatches(req, res),
);
router.post(
  '/',
  Validations.Token,
  Validations.checkEqualTeams,
  (req, res) => matchController.newMatches(req, res),
);

export default router;
