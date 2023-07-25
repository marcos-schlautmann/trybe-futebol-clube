import { Router } from 'express';
import leaderboardRouter from './leaderboard.routes';
import matchRouter from './match.routes';
import teamRouter from './team.routes';
import userRouter from './user.routes';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', userRouter);
router.use('/matches', matchRouter);
router.use('/leaderboard', leaderboardRouter);

export default router;
