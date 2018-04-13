export default class Team {
  constructor(team = {}) {
    this.id = team.id || null;
    this.name = team.name || "";
    this.opponents = team.opponents || [];
    this.totalPoints = team.totalPoints || 0;
    this.matches = team.matches || 0;
  }
}
