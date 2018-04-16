import React from "react";
import { render } from "react-dom";
import Team from "./models/Team";
import { Schedule } from "./components/Schedule";
import { Teams } from "./components/Teams";

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
    // let { numOfTeams, teams } = this.state;
    // let value = event.target.value;

    // var toAdd = this._createTeams(value).filter(obj => {
    //   return !teams.some(obj2 => {
    //     return obj.id === obj2.id;
    //   });
    // });

    // var toRemove = teams.filter(obj => {
    //   return !this._createTeams(value).some(obj2 => {
    //     return obj.id === obj2.id;
    //   });
    // });

    // this.setState(prevState => {
    //   return {
    //     numOfTeams: value,
    //     teams: [...prevState.teams, ...toAdd]
    //   };
    // });

    this.setState({
      numOfTeams: event.target.value,
      teams: this._createTeams(event.target.value)
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
    if (winner) {
      teams.find(t => t.id === winner).totalPoints += 3;
    } else {
      teams.find(t => t.id === game.team1.id).totalPoints += 1;
      teams.find(t => t.id === game.team2.id).totalPoints += 1;
    }

    teams.find(t => t.id === game.team1.id).matches += 1;
    teams.find(t => t.id === game.team1.id).scoredGoals += parseInt(
      game.team1Goals
    );
    teams.find(t => t.id === game.team1.id).lostGoals += parseInt(
      game.team2Goals
    );
    teams.find(t => t.id === game.team2.id).matches += 1;
    teams.find(t => t.id === game.team2.id).scoredGoals += parseInt(
      game.team2Goals
    );
    teams.find(t => t.id === game.team2.id).lostGoals += parseInt(
      game.team1Goals
    );
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
    let { teams, submitted } = this.state;
    return (
      <div style={styles}>
        <h1>Fixtures generator</h1>
        {!submitted && (
          <form onSubmit={this.handleSubmit}>
            <label>How many teams? </label>

            <select value={this.state.numOfTeams} onChange={this.handleChange}>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>

            <input type="submit" value="Create a schedule" />
          </form>
        )}
        {teams.length > 0 && <Teams teams={teams} handler={this.setTeamName} />}
        {submitted && <Schedule teams={teams} handler={this.setResult} />}
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
