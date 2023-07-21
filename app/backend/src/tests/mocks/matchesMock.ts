const match = {
    id: 1,
    home_team_id: 24,
    home_team_goals: 3,
    away_team_id: 1,
    away_team_goals: 2,
    in_progress: false,
};

const updateMatchesBody = {
    homeTeamGoals: 5,
    awayTeamGoals: 3,
}

const newMatch = {
    homeTeamId: 16,
    awayTeamId: 8,
    homeTeamGoals: 1,
    awayTeamGoals: 5,
}

const matches = [match];

export {
    match, matches, newMatch, updateMatchesBody
};
