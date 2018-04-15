import React from "react";
import { render } from "react-dom";
import Team from "./models/Team";
import { Schedule } from "./components/Schedule";

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
        submitted: true
      };
    });

    event.preventDefault();
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
        <Schedule teams={teams} />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
