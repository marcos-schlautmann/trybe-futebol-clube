import { IMatches } from '../Interfaces/Matches/IMatches';

export default class ValidationStatusBuild {
  private matches: IMatches[];
  private teamId: number;

  constructor(matches: IMatches[], teamId: number) {
    this.matches = matches;
    this.teamId = teamId;
  }

  get totalPoints(): number {
    return this.matches.reduce((total, match) => {
      const HomeMatch = match.homeTeamId === this.teamId;
      const AwayMatch = match.awayTeamId === this.teamId;
      const Won = (HomeMatch && match.homeTeamGoals > match.awayTeamGoals)
        || (AwayMatch && match.awayTeamGoals > match.homeTeamGoals);
      const hasDrawn = (HomeMatch || AwayMatch) && match.homeTeamGoals === match.awayTeamGoals;

      if (Won) {
        return total + 3;
      }
      if (hasDrawn) {
        return total + 1;
      }

      return total;
    }, 0);
  }

  get totalVictories(): number {
    return this.matches.reduce((total, match) => {
      const HomeMatch = match.homeTeamId === this.teamId
        && match.homeTeamGoals > match.awayTeamGoals;
      const AwayMatch = match.awayTeamId === this.teamId
        && match.awayTeamGoals > match.homeTeamGoals;

      return total + (HomeMatch || AwayMatch ? 1 : 0);
    }, 0);
  }

  get totalDraws(): number {
    return this.matches.reduce((total, match) => {
      const HomeMatch = match.homeTeamId === this.teamId
        && match.homeTeamGoals === match.awayTeamGoals;
      const AwayMatch = match.awayTeamId === this.teamId
        && match.awayTeamGoals === match.homeTeamGoals;

      return total + (HomeMatch || AwayMatch ? 1 : 0);
    }, 0);
  }

  get totalLosses(): number {
    return this.matches.reduce((total, match) => {
      const HomeMatch = match.homeTeamId === this.teamId
        && match.homeTeamGoals < match.awayTeamGoals;
      const AwayMatch = match.awayTeamId === this.teamId
        && match.awayTeamGoals < match.homeTeamGoals;

      return total + (HomeMatch || AwayMatch ? 1 : 0);
    }, 0);
  }

  get goalsFavor(): number {
    return this.matches.reduce((total, match) => {
      const HomeMatch = match.homeTeamId === this.teamId;
      const AwayMatch = match.awayTeamId === this.teamId;

      if (HomeMatch) {
        return total + match.homeTeamGoals;
      }
      if (AwayMatch) {
        return total + match.awayTeamGoals;
      }

      return total;
    }, 0);
  }

  get goalsOwn(): number {
    return this.matches.reduce((total, match) => {
      const HomeMatch = match.homeTeamId === this.teamId;
      const AwayMatch = match.awayTeamId === this.teamId;

      if (HomeMatch) {
        return total + match.awayTeamGoals;
      }
      if (AwayMatch) {
        return total + match.homeTeamGoals;
      }

      return total;
    }, 0);
  }

  get goalsBalance(): number {
    return this.goalsFavor - this.goalsOwn;
  }

  get efficiency(): number {
    const maxPoints = this.matches.length * 3;
    const accPoints = this.totalPoints;
    return +((100 / maxPoints) * accPoints).toFixed(2);
  }
}
