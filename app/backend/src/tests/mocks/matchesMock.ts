const match = {
  id: 1,
  home_team_id: 24,
  home_team_goals: 3,
  away_team_id: 1,
  away_team_goals: 2,
  in_progress: true,
};

const updateMatchesBody = {
  homeTeamGoals: 3,
  awayTeamGoals: 1,
};

const createMatch = { 
  homeTeamId: 16,
  awayTeamId: 8, 
  homeTeamGoals: 2,
  awayTeamGoals: 2
};

const matches = [
  {
    id: 1,
    home_team_id: 24,
    home_team_goals: 3,
    away_team_id: 1,
    away_team_goals: 2,
    in_progress: false,
  },
];

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY4OTk4MDUwNCwiZXhwIjoxNjkwNTg1MzA0fQ.IHOVVq25ZUOGboGjlK-uRg5iBTQsvP0NvW0KegX7l1g";

export {
  createMatch,
  match,
  matches, token,
  updateMatchesBody
};

