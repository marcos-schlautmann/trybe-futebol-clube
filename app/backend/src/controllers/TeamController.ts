import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import TeamService from '../services/TeamService';
// import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class TeamController {
  constructor(
    private teamService = new TeamService(),
  ) { }

  public async getAllTeams(_req: Request, res: Response) {
    const serviceResponse = await this.teamService.getAllTeams();
    res.status(200).json(serviceResponse.data);
  }

  public async getTeamsById(req: Request, res: Response) {
    const { id } = req.params;
    const response = await this.teamService.getTeamsById(Number(id));

    if (response.status !== 'SUCESSFUL') {
      return res.status(mapStatusHTTP(response.status)).json(response.data);
    }

    return res.status(200).json(response.data);
  }
}
