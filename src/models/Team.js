export default class Team {
  constructor(team = {}) {
    this.id = team.id || null;
    this.name = team.name || "";
    this.opponents = team.opponents || [];
    this.totalPoints = team.totalPoints || 0;
    this.scoredGoals = team.scoredGoals || 0;
    this.lostGoals = team.lostGoals || 0;
    this.matches = team.matches || 0;
    this.wins = team.wins || 0;
    this.draws = team.draws || 0;
    this.losts = team.losts || 0;
  }
}
