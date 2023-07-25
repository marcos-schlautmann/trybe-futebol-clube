import { Request, Response } from 'express';
import LeaderboadService from '../services/LeaderboardService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LeaderboardController {
  constructor(private leaderboardService = new LeaderboadService()) { }

  async getLeaderboardHome(req: Request, res: Response) {
    const { status, data } = await this.leaderboardService.getHomeStatus();
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
