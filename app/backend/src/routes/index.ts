import { Router } from 'express';
import matchRouter from './match.routes';
import teamRouter from './team.routes';
import userRouter from './user.routes';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', userRouter);
router.use('/matches', matchRouter);

export default router;
