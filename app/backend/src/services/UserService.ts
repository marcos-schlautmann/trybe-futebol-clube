import * as bcrypt from 'bcryptjs';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IUser } from '../Interfaces/Users/IUser';
import { IUserModel } from '../Interfaces/Users/IUserModel';
import UserModel from '../models/UserModel';

export default class UserService {
  constructor(private userModel: IUserModel = new UserModel()) { }

  public async findByEmail(email: string, password: string): Promise<ServiceResponse<IUser>> {
    const userEmail = await this.userModel.findByEmail(email);

    if (!userEmail || !bcrypt.compareSync(password, userEmail.password)) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    return { status: 'SUCESSFUL', data: userEmail };
  }

  public async findRole(email: string): Promise<ServiceResponse<IUser>> {
    const userRole = await this.userModel.findByEmail(email);

    if (!userRole) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    return { status: 'SUCESSFUL', data: userRole };
  }
}
