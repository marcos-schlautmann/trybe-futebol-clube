import { ICRUDModelReader } from '../ICRUDModel';
import { IMatches } from './IMatches';

export interface IMatchesModel extends ICRUDModelReader<IMatches> {
  findByInProgress(inProgress: boolean): Promise<IMatches[]>
  finishMatches(id: number): Promise<void>
  updateMatches(id: number, homeTeamGoals: number, awayTeamGoals: number): Promise<void>
  newMatches(match: IMatches): Promise<IMatches>
}
