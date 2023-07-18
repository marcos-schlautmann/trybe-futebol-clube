import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  CreationOptional,
} from 'sequelize';
import db from '.';

class TeamsSequelizeModel extends Model<
InferAttributes<TeamsSequelizeModel>,
InferCreationAttributes<TeamsSequelizeModel>
> {
  declare id: CreationOptional<number>;
  declare teamName: string;
}

TeamsSequelizeModel.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'team_name',
  },
}, {
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
  underscored: true,
});

export default TeamsSequelizeModel;
