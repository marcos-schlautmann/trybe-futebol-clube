import { ITeams } from '../Interfaces/Teams/ITeams';
import { ITeamModel } from '../Interfaces/Teams/ITeamModel';
import SequelizeTeam from '../database/models/teams.model';

export default class TeamModel implements ITeamModel {
  private model = SequelizeTeam;

  async findAll(): Promise<ITeams[]> {
    const data = await this.model.findAll();
    return data.map(({ id, teamName }) => ({ id, teamName }));
  }

  async findById(id: ITeams['id']): Promise<ITeams | null> {
    const dbData = await this.model.findByPk(id);

    if (dbData === null) return null;

    const { teamName } = dbData;

    return { id, teamName };
  }
}
