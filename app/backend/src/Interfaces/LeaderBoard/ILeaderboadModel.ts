import { ICRUDModelReader } from '../ICRUDModel';
import { IMatches } from '../Matches/IMatches';
import IHomeLeaderboard from './ITeamStatus';

export interface ILeaderboardModel extends ICRUDModelReader<IHomeLeaderboard> {
  getTeamStatus(): Promise<IMatches[]>;
}
