import React from "react";
import { render } from "react-dom";
import Team from "./models/Team";
import { Schedule } from "./components/Schedule";
import { Teams } from "./components/Teams";
import { Groups } from "./components/Groups";
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
    numOfGroups: 2,
    submitted: false,
    revange: false,
    typeOfTournament: "play-off",
    teams: []
  };

  handleChange = event => {
    const name = event.target.name;
    if (event.target.type === "checkbox") {
      this.setState({
        revange: event.target.checked
      });
    } else if (name === "numOfTeams") {
      const teams = this._createTeams(event.target.value);
      this.setState({
        [name]: event.target.value,
        teams
      });
    } else {
      this.setState({
        [name]: event.target.value
      });
    }
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
    let {
      teams,
      submitted,
      numOfTeams,
      numOfGroups,
      revange,
      typeOfTournament
    } = this.state;
    return (
      <div style={styles}>
        {/*<Table teams={teams} />*/}
        <h1>Fixtures generator</h1>

        {!submitted && (
          <form onSubmit={this.handleSubmit}>
            <div>
              {" "}
              <label>Type of tournament </label>
              <select
                name="typeOfTournament"
                value={typeOfTournament}
                onChange={this.handleChange}
              >
                <option value="groups&play-off">groups + play-off</option>
                <option value="league">league</option>
                <option value="play-off">play-off</option>
              </select>
            </div>
            <div>
              {" "}
              <label>How many teams? </label>
              <input
                name="numOfTeams"
                type="number"
                min={2}
                style={{ width: 40, textAlign: "center" }}
                value={numOfTeams}
                onChange={this.handleChange}
              />
            </div>
            {typeOfTournament === "groups&play-off" && (
              <div>
                {" "}
                <label>How many groups? </label>
                <input
                  name="numOfGroups"
                  type="number"
                  min={2}
                  style={{ width: 40, textAlign: "center" }}
                  value={numOfGroups}
                  onChange={this.handleChange}
                />
              </div>
            )}
            <div>
              <label>Revange? </label>
              <input
                type="checkbox"
                value={revange}
                onChange={this.handleChange}
              />{" "}
            </div>
            <input type="submit" value="Create a schedule" />
          </form>
        )}

        <p>
          games:{" "}
          {revange
            ? numOfTeams / 2 * (numOfTeams - 1) * 2
            : numOfTeams / 2 * (numOfTeams - 1)}{" "}
        </p>
        <p>
          {numOfTeams % 2
            ? revange ? numOfTeams * 2 : numOfTeams
            : revange ? (numOfTeams - 1) * 2 : numOfTeams - 1}{" "}
          rounds, each with{" "}
          {numOfTeams % 2 ? (numOfTeams - 1) / 2 : numOfTeams / 2} games{" "}
        </p>

        {typeOfTournament === "league" &&
          teams.length > 1 && (
            <Teams teams={teams} handler={this.setTeamName} />
          )}

        {typeOfTournament === "groups&play-off" && (
          <Groups teams={teams} numOfGroups={numOfGroups} />
        )}

        {submitted && <Schedule teams={teams} handler={this.setResult} />}
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
