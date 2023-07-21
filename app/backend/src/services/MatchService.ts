import { IMatches } from '../Interfaces/Matches/IMatches';
import { IMatchesModel } from '../Interfaces/Matches/IMatchesModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import MatchesModel from '../models/MatchModel';

export default class MatchService {
  constructor(
    private matchesModel: Omit<IMatchesModel, 'findById'> = new MatchesModel(),
  ) {}

  async findAll(inProgress?: boolean): Promise<ServiceResponse<IMatches[]>> {
    return inProgress === undefined
      ? { status: 'SUCESSFUL', data: await this.matchesModel.findAll() }
      : { status: 'SUCESSFUL', data: await this.matchesModel.findByInProgress(inProgress) };
  }

  async finishMatches(id: number): Promise<ServiceResponse<{ message: string }>> {
    await this.matchesModel.finishMatches(id);
    return { status: 'SUCESSFUL', data: { message: 'Finished' } };
  }

  async updateMatches(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<ServiceResponse<{ message: string }>> {
    await this.matchesModel.updateMatches(id, homeTeamGoals, awayTeamGoals);

    return { status: 'SUCESSFUL', data: { message: 'Scores Updated!' } };
  }

  async newMatches(match: IMatches): Promise<ServiceResponse<IMatches>> {
    const newMatch = { ...match, inProgress: true };

    return { status: 'OK', data: await this.matchesModel.newMatches(newMatch) };
  }
}
