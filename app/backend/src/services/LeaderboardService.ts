import { ILeaderboardModel } from '../Interfaces/LeaderBoard/ILeaderboadModel';
import ITeamStatus from '../Interfaces/LeaderBoard/ITeamStatus';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import LeaderboardModel from '../models/LeaderboardModel';
import TeamModel from '../models/TeamModel';
import ValidationStatusBuild from './ValidationLeaderboard';

export default class LeaderboadService {
  constructor(private learderboardModel: Omit<
  ILeaderboardModel,
  'findById' | 'findAll'> = new LeaderboardModel()) { }

  async getHomeStatus(): Promise<ServiceResponse<ITeamStatus[]>> {
    const matches = await this.learderboardModel.getTeamStatus();
    const teams = await new TeamModel().findAll();

    const homeLeaderboard: ITeamStatus[] = teams.map((team) => {
      const homeStatus = matches.filter((match) => team.id === match.homeTeamId);
      const statusBuild = new ValidationStatusBuild(homeStatus, team.id);

      return {
        name: team.teamName,
        totalPoints: statusBuild.totalPoints,
        totalGames: homeStatus.length,
        totalVictories: statusBuild.totalVictories,
        totalDraws: statusBuild.totalDraws,
        totalLosses: statusBuild.totalLosses,
        goalsFavor: statusBuild.goalsFavor,
        goalsOwn: statusBuild.goalsOwn,
      };
    });
    return { status: 'SUCESSFUL', data: homeLeaderboard };
  }
}
