import { ILeaderboardModel } from '../Interfaces/LeaderBoard/ILeaderboadModel';
import { IMatches } from '../Interfaces/Matches/IMatches';
import MatchesSequelizeModel from '../database/models/matches.models';
import TeamsSequelizeModel from '../database/models/teams.model';

export default class LeaderboardModel
implements Omit<ILeaderboardModel, 'findById' | 'findAll'> {
  private model = MatchesSequelizeModel;

  async getTeamStatus(): Promise<IMatches[]> {
    return this.model.findAll({
      attributes: { exclude: ['home_team_id', 'away_team_id'] },
      include: [
        {
          model: TeamsSequelizeModel,
          as: 'homeTeam',
          attributes: {
            exclude: ['id'],
          },
        },
        {
          model: TeamsSequelizeModel,
          as: 'awayTeam',
          attributes: { exclude: ['id'] },
        },
      ],
      where: { inProgress: false },
    });
  }
}
