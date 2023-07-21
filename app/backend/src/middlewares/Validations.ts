import { NextFunction, Request, Response } from 'express';
import { ITeamModel } from '../Interfaces/Teams/ITeamModel';
import { ILogin, IUser } from '../Interfaces/Users/IUser';
import TeamModel from '../models/TeamModel';
import JWT from '../utils/JWT';
import mapStatusHTTP from '../utils/mapStatusHTTP';

class Validations {
  static Login(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body as ILogin;
    const passwordMinLength = 6;
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/g;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    if (!regex.test(email) || password.length < passwordMinLength) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    next();
  }

  static Token(req: Request, res: Response, next: NextFunction): Response | void {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const token = authorization.split(' ')[1];

    try {
      const decoded = JWT.verifyToken(token) as IUser;

      if (!decoded) {
        throw new Error('Token must be a valid token');
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }

  static async checkEqualTeams(req: Request, res: Response, next: NextFunction)
    : Promise<Response | void> {
    const { homeTeamId, awayTeamId } = req.body;

    if (homeTeamId === awayTeamId) {
      return res.status(mapStatusHTTP('CONFLICT'))
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }

    const teamsModel: ITeamModel = new TeamModel();

    const teams = await teamsModel.findAll();
    const homeTeamCheck = teams.some((team) => team.id === homeTeamId);
    const awayTeamCheck = teams.some((team) => team.id === awayTeamId);

    if (!(homeTeamCheck && awayTeamCheck)) {
      return res.status(mapStatusHTTP('NOT_FOUND'))
        .json({ message: 'There is no team with such id!' });
    }

    next();
  }
}

export default Validations;
