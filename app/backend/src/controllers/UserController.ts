import { Request, Response } from 'express';
import { IUser } from '../Interfaces/Users/IUser';
import UserService from '../services/UserService';
import JWT from '../utils/JWT';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class UserController {
  constructor(private userService = new UserService()) {}

  public findByEmail = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const response = await this.userService.findByEmail(email, password);

    if (response.status !== 'SUCESSFUL') {
      return res.status(mapStatusHTTP(response.status)).json(response.data);
    }

    return res.status(200).json({ token: JWT.signToken({ email, role: response.data.role }) });
  };

  public async findRole(req: Request, res: Response) {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(200).json({ message: 'Token not found' });
    }
    const tokenLogin = authorization.split(' ')[1];
    const emailLogin = JWT.decodeToken(tokenLogin) as IUser;

    const response = await this.userService.findRole(emailLogin.email);

    if (response.status !== 'SUCESSFUL') {
      return res.status(mapStatusHTTP(response.status)).json(response.data);
    }
    return res.status(200).json({ role: response.data.role });
  }
}
