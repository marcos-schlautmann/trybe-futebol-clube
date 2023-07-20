import { NextFunction, Request, Response } from 'express';
import { ILogin, IUser } from '../Interfaces/Users/IUser';
import JWT from '../utils/JWT';

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

  static Token(req: Request, res: Response): Response | void {
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

      return res.status(200).json({ role: decoded.role });
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
}

export default Validations;
