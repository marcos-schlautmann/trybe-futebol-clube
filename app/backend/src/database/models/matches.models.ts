import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import db from '.';
import TeamsSequelizeModel from './teams.model';

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
      field: 'home_team_id',
      references: { model: 'teams' },
    },
    homeTeamGoals: {
      type: DataTypes.NUMBER,
      allowNull: false,
      field: 'home_team_goals',
    },
    awayTeamId: {
      type: DataTypes.NUMBER,
      allowNull: false,
      references: { model: 'teams' },
      field: 'away_team_id',
    },
    awayTeamGoals: {
      type: DataTypes.NUMBER,
      allowNull: false,
      field: 'away_team_goals',
    },
    inProgress: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: 'in_progress',
    },
  },
  {
    sequelize: db,
    modelName: 'matches',
    timestamps: false,
    underscored: true,
  },
);

TeamsSequelizeModel.hasMany(MatchesSequelizeModel, {
  foreignKey: 'home_team_id',
  as: 'homeTeam',
});

MatchesSequelizeModel.belongsTo(TeamsSequelizeModel, {
  foreignKey: 'home_team_id',
  as: 'homeTeam',
});

TeamsSequelizeModel.hasMany(MatchesSequelizeModel, {
  foreignKey: 'away_team_id',
  as: 'awayTeam',
});

MatchesSequelizeModel.belongsTo(TeamsSequelizeModel, {
  foreignKey: 'away_team_id',
  as: 'awayTeam',
});

export default MatchesSequelizeModel;
