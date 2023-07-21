import { Request, Response } from 'express';
import MatchesService from '../services/MatchService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchController {
  constructor(private matchesService = new MatchesService()) {}

  async findAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;

    const inProgressBoolean = inProgress ? inProgress === 'true' : undefined;

    const { status, data } = await this.matchesService.findAll(
      inProgressBoolean,
    );

    return res.status(mapStatusHTTP(status)).json(data);
  }

  async finishMatches(req: Request, res: Response) {
    const { status, data } = await this.matchesService.finishMatches(
      Number(req.params.id),
    );

    return res.status(mapStatusHTTP(status)).json(data);
  }

  async updateMatches(req: Request, res: Response) {
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { id } = req.params;

    const { status, data } = await this.matchesService.updateMatches(
      Number(id),
      homeTeamGoals,
      awayTeamGoals,
    );

    return res.status(mapStatusHTTP(status)).json(data);
  }

  async newMatches(req: Request, res: Response) {
    const { status, data } = await this.matchesService.newMatches(req.body);

    return res.status(mapStatusHTTP(status)).json(data);
  }
}
