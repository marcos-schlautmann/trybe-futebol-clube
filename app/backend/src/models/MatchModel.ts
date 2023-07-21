import { IMatches } from '../Interfaces/Matches/IMatches';
import { IMatchesModel } from '../Interfaces/Matches/IMatchesModel';
import MatchesSequelizeModel from '../database/models/matches.models';
import TeamsSequelizeModel from '../database/models/teams.model';

export default class MatchesModel implements Omit<IMatchesModel, 'findById'> {
  private model = MatchesSequelizeModel;

  async findAll(): Promise<IMatches[]> {
    const matchesList = await this.model.findAll({
      attributes: { exclude: ['home_team_id', 'away_team_id'] },
      include: [
        { model: TeamsSequelizeModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: TeamsSequelizeModel, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });

    return matchesList;
  }

  async findByInProgress(inProgress: boolean): Promise<IMatches[]> {
    const inProgressList = await this.model.findAll({
      attributes: { exclude: ['home_team_id', 'away_team_id'] },
      include: [
        { model: TeamsSequelizeModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: TeamsSequelizeModel, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
      where: { inProgress },
    });

    return inProgressList;
  }

  async finishMatches(id: number): Promise<void> {
    await this.model.update({ inProgress: false }, { where: { id } });
  }

  async updateMatches(id: number, homeTeamGoals: number, awayTeamGoals: number): Promise<void> {
    await this.model.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  }

  async newMatches(match: IMatches): Promise<IMatches> {
    const newmatches = await this.model.create(match);
    return newmatches;
  }
}
