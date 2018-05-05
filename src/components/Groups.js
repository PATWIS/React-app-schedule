import React from "react";
import { Teams } from "./Teams";
import { Schedule } from "./Schedule";
import { Table } from "./Table";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

export class Groups extends React.Component {
  state = {
    groups: []
  };

  setResult = game => {
    this.props.handler(game);
  };

  _splitUp(arr, n) {
    var rest = arr.length % n, // how much to divide
      restUsed = rest, // to keep track of the division over the elements
      partLength = Math.floor(arr.length / n),
      result = [];

    for (var i = 0; i < arr.length; i += partLength) {
      var end = partLength + i,
        add = false;

      if (rest !== 0 && restUsed) {
        // should add one element for the division
        end++;
        restUsed--; // we've used one division element now
        add = true;
      }

      result.push(arr.slice(i, end)); // part of the array

      if (add) {
        i++; // also increment i in the case we added an extra element for division
      }
    }

    return result;
  }

  _createGroups(numOfGroups, teams) {
    let groups = [];
    let groupTeams = this._splitUp(teams, numOfGroups);

    for (let i = 0; i < numOfGroups; i++) {
      groups.push({ id: i + 1, name: `Group ${i + 1}`, teams: groupTeams[i] });
    }
    return groups;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      submitted: nextProps.submitted,
      groups: this._createGroups(nextProps.numOfGroups, [...nextProps.teams])
    });
  }

  componentDidMount() {
    this.setState({
      groups: this._createGroups(this.props.numOfGroups, [...this.props.teams])
    });
  }

  render() {
    let { groups, submitted } = this.state;
    return (
      <div style={styles}>
        <h2>Groups</h2>
        {groups.map(g => (
          <li key={g.id}>
            {" "}
            {g.name} <Teams teams={g.teams} handler={this.setTeamName} />
            {<Table teams={g.teams} />}
            {submitted && <Schedule teams={g.teams} handler={this.setResult} />}
          </li>
        ))}
      </div>
    );
  }
}

// <input
//   value={groups[t.id - 1].name}
//   onChange={this.handleChangeName.bind(this, t.id)}
// />
