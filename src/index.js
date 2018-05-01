import React from "react";
import { render } from "react-dom";
import Team from "./models/Team";
import { Schedule } from "./components/Schedule";
import { Teams } from "./components/Teams";
import { Table } from "./components/Table";

// import * as nodemailer from "nodemailer";
// import * as Email from "email-templates";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

class App extends React.Component {
  state = {
    numOfTeams: 4,
    submitted: false,
    teams: []
  };

  handleChange = event => {
    const teams = this._createTeams(event.target.value);

    this.setState({
      numOfTeams: event.target.value,
      teams
    });
  };

  handleSubmit = event => {
    this.setState({
      submitted: true
    });

    event.preventDefault();
  };

  componentDidMount() {
    let { numOfTeams } = this.state;

    this.setState({
      teams: this._createTeams(numOfTeams)
    });
  }

  _createTeams(howMany) {
    let teams = [];
    for (let i = 0; i < howMany; i++) {
      teams.push(new Team({ id: i + 1, name: `Team ${i + 1}` }));
    }
    return teams;
  }

  setTeamName = (id, name) => {
    let { teams } = this.state;
    teams[id - 1].name = name;
    this.setState({ teams });
  };

  _checkWhoWin(game) {
    let winner;
    switch (true) {
      case game.team1Goals > game.team2Goals:
        winner = game.team1.id;
        break;
      case game.team1Goals < game.team2Goals:
        winner = game.team2.id;
        break;
      default:
        break;
    }
    return winner;
  }

  _addGameResult(game, winner, teams) {
    const gamePair = [game.team1.id, game.team2.id];
    gamePair.forEach((t, i) => {
      teams.map(
        el =>
          el.id === t &&
          Object.assign(el, {
            totalPoints:
              winner === el.id // check if we are the winner.
                ? el.totalPoints + 3
                : !winner ? el.totalPoints + 1 : el.totalPoints, // if winner is not exist, we draw the match and get 1 point, otherwise we lost :(
            matches: el.matches + 1,
            scoredGoals:
              el.scoredGoals +
              parseInt(i === 0 ? game.team1Goals : game.team2Goals),
            lostGoals:
              el.lostGoals +
              parseInt(i === 0 ? game.team2Goals : game.team1Goals),
            wins: winner === el.id ? el.wins + 1 : el.wins,
            losts: winner && winner !== el.id ? el.losts + 1 : el.losts,
            draws: !winner ? el.draws + 1 : el.draws
          })
      );
    });
  }

  setResult = game => {
    let winner = this._checkWhoWin(game);

    this.setState(prevState => {
      this._addGameResult(game, winner, prevState.teams);
      return {
        teams: prevState.teams
      };
    });
  };

  render() {
    let { teams, submitted, numOfTeams } = this.state;
    return (
      <div style={styles}>
        <Table teams={teams} />
        <h1>Fixtures generator</h1>

        {!submitted && (
          <form onSubmit={this.handleSubmit}>
            <label>How many teams? </label>

            <select value={numOfTeams} onChange={this.handleChange}>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="14">14</option>
            </select>

            <input type="submit" value="Create a schedule" />
          </form>
        )}

        <p>games: {numOfTeams / 2 * (numOfTeams - 1)} </p>

        {teams.length > 1 ? (
          <Teams teams={teams} handler={this.setTeamName} />
        ) : (
          <p>select at least 2 teams</p>
        )}
        {submitted && <Schedule teams={teams} handler={this.setResult} />}
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
