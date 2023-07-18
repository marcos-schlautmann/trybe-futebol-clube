import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';

class MatchesSequelizeModel extends Model<
InferAttributes<MatchesSequelizeModel>,
InferCreationAttributes<MatchesSequelizeModel>
> {
  declare id: CreationOptional<number>;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

MatchesSequelizeModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    homeTeamId: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    homeTeamGoals: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    awayTeamId: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    awayTeamGoals: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    inProgress: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'matches',
    timestamps: false,
    underscored: true,
  },
);

export default MatchesSequelizeModel;
