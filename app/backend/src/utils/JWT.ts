import * as jwt from 'jsonwebtoken';
import * as Interfaces from '../Interfaces';

const jwtSecret = process.env.JWT_SECRET || 'schlautmann';

const jwtConfig: jwt.SignOptions = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

export default {
  signToken: (payload: Interfaces.Token): string =>
    jwt.sign(payload, jwtSecret, jwtConfig),

  verifyToken: (token: string) => jwt.verify(token, jwtSecret),

  decodeToken: (token: string) => jwt.decode(token),
};
