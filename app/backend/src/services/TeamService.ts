import { ITeams } from '../Interfaces/Teams/ITeams';
import { ITeamModel } from '../Interfaces/Teams/ITeamModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import TeamModel from '../models/TeamModel';

export default class TeamService {
  constructor(
    private teamModel: ITeamModel = new TeamModel(),
  ) { }

  public async getAllTeams(): Promise<ServiceResponse<ITeams[]>> {
    const teams = await this.teamModel.findAll();
    return { status: 'SUCESSFUL', data: teams };
  }
}
