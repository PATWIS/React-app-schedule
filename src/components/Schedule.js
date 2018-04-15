import React from "react";
import Team from "../models/Team";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

export class Schedule extends React.Component {
  state = {
    teams: [],
    games: []
  };

  componentWillReceiveProps(nextProps) {
    let total;
    if (this.props.teams.length % 2 === 0) {
      total = this.props.teams.length - 1;
    } else {
      total = this.props.teams.length;
    }

    this.setState({
      teams: nextProps.teams,
      total: total
    });

    // alert('willReceive')

    this.creategames();
  }

  creategames = () => {
    // let { teams } = this.state;

    let teams = Array.apply(0, Array(this.state.teams.length)).map(
      (_, i) => new Team({ id: i + 1 })
    );

    let fixtures = [];
    for (let f = 0; f < teams.length - 1; f++) {
      let pp = teams.slice(),
        games = [],
        count = Math.floor(pp.length / 2);
      while (count--) games.push([pp.shift(), pp.pop()]);
      fixtures.push({ id: f + 1, games });
      teams = [new Team({ id: 1 })].concat(teams.slice(2), [teams[1]]);
    }
    this.setState({
      fixtures
    });
  };

  componentDidMount() {
    this.setState({
      teams: this.props.teams
    });
  }

  render() {
    let { fixtures, teams, total, gamesbyFixture } = this.state;
    return (
      <div style={styles}>
        {teams.length > 0 && (
          <div>
            {" "}
            <h2>fixtures</h2>
            <ul>
              {fixtures.map(f => (
                <li key={f.id}>
                  fixture no {f.id}
                  <ol>
                    {f.games.map(g => (
                      <li key={g.id}>
                        {" "}
                        {g[0].id} vs {g[1].id}{" "}
                      </li>
                    ))}
                  </ol>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}
