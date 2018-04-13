import React from "react";
import { render } from "react-dom";
import Hello from "./Hello";
import Team from "./models/Team";
import { Schedule } from "./components/Schedule";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

class App extends React.Component {
  state = {
    numOfTeams: 4,
    teamHasChoosen: false,
    teams: []
  };

  handleChange = event => {
    this.setState({ numOfTeams: event.target.value });
  };

  handleSubmit = event => {
    let { numOfTeams, teams } = this.state;

    for (let i = 0; i < numOfTeams; i++) {
      teams.push(new Team({ id: i + 1, name: `Team ${i + 1}` }));
    }

    this.setState(prevState => {
      prevState.teams.forEach(newTeam => {
        prevState.teams.forEach(team => {
          team.id !== newTeam.id &&
            team.opponents.push({
              name: newTeam.name,
              opponentId: newTeam.id
            });
        });
      });
      return {
        ...prevState,
        teams: [...prevState.teams],
        teamHasChoosen: true
      };
    });

    event.preventDefault();
  };

  render() {
    let { teams, teamHasChoosen } = this.state;
    return (
      <div style={styles}>
        <Hello name="CodeSandbox" />

        {!teamHasChoosen && (
          <form onSubmit={this.handleSubmit}>
            <label>How many teams? </label>

            <select value={this.state.numOfTeams} onChange={this.handleChange}>
              <option value="2">2</option>
              <option value="4">4</option>
              <option value="6">6</option>
              <option value="8">8</option>
            </select>

            <input type="submit" value="Submit" />
          </form>
        )}
        <Schedule teams={teams} />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
