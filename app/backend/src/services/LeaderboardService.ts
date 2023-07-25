import { ILeaderboardModel } from '../Interfaces/LeaderBoard/ILeaderboadModel';
import ITeamStatus from '../Interfaces/LeaderBoard/ITeamStatus';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import LeaderboardModel from '../models/LeaderboardModel';
import TeamModel from '../models/TeamModel';
import ValidationStatusBuild from './ValidationLeaderboard';

export default class LeaderboadService {
  constructor(
    private learderboardModel: Omit<
    ILeaderboardModel,
    'findById' | 'findAll'
    > = new LeaderboardModel(),
  ) {}

  private _leaderboard: ITeamStatus[] = [];

  async getHomeStatus(): Promise<ServiceResponse<ITeamStatus[]>> {
    this._leaderboard = await this.getLeaderboard();
    return { status: 'SUCESSFUL', data: this.sortTeams() };
  }

  private async getLeaderboard(): Promise<ITeamStatus[]> {
    const matches = await this.learderboardModel.getTeamStatus();
    const teams = await new TeamModel().findAll();
    return teams.map((team) => {
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
        goalsBalance: statusBuild.goalsBalance,
        efficiency: statusBuild.efficiency,
      };
    });
  }

  private sortTeams(): ITeamStatus[] {
    const params: (keyof ITeamStatus)[] = [
      'totalPoints',
      'totalVictories',
      'goalsBalance',
      'goalsFavor',
    ];

    return this._leaderboard.sort((a, b) => {
      const sorted = params.find(
        (param) => a[param] !== b[param],
      ) as keyof ITeamStatus;
      return +b[sorted] - +a[sorted];
    });
  }
}
