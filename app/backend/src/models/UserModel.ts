import UsersSequelizeModel from '../database/models/users.model';
import { IUser } from '../Interfaces/Users/IUser';
import { IUserModel } from '../Interfaces/Users/IUserModel';

export default class UserModel implements IUserModel {
  private model = UsersSequelizeModel;

  async findByEmail(email: IUser['email']): Promise<IUser | null> {
    const userEmail = await this.model.findOne({ where: { email } });

    if (!userEmail) {
      return null;
    }

    const { id, password, username, role } = userEmail;
    return { id, email, password, username, role };
  }

  async findRole(email: IUser['email']): Promise<string | null> {
    const userRole = await this.model.findOne({
      where: { email },
      attributes: ['role'],
    });

    if (!userRole) {
      return null;
    }

    return userRole.role;
  }
}
