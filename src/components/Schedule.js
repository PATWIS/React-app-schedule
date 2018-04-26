import React from "react";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center",
  scoreResult: {
    width: 20,
    margin: 5,
    textAlign: "center"
  }
};

export class Schedule extends React.Component {
  state = {
    teams: [],
    fixtures: []
  };

  setScore(fixtureId, gameId, event) {
    let value = event.target.value;
    let name = event.target.name;

    this.setState(prevState => {
      prevState.fixtures
        .find(f => f.id === fixtureId)
        .games.find(g => g.id === gameId)[name] = value;
      return {
        ...prevState
      };
    });

    console.log(this.state.fixtures);
  }

  _createGames = () => {
    let { teams } = this.props;
    // let teams = Array.apply(0, Array(this.state.teams.length)).map(
    //   (_, i) => new Team({ id: i + 1 })
    // );

    let fixtures = [];
    let gameNumber = 1;
    for (let f = 0; f < teams.length - 1; f++) {
      let pp = teams.slice(),
        games = [],
        count = Math.floor(pp.length / 2),
        gameId = 0;

      while (count--)
        games.push({
          id: gameNumber++,
          team1: pp.shift(),
          team2: pp.pop(),
          team1Goals: "",
          team2Goals: ""
        });

      fixtures.push({ id: f + 1, games });
      teams = [teams[0]].concat(teams.slice(2), [teams[1]]);
    }
    this.setState({
      teams,
      fixtures
    });
  };

  setResult = (fixtureId, game) => {
    this.setState(prevState => {
      prevState.fixtures
        .find(f => f.id === fixtureId)
        .games.find(g => g.id === game.id).resultIsSet = true;
      return {
        fixtures: prevState.fixtures
      };
    });

    this.props.handler(game);
  };

  simulateResult = (fixtureId, game) => {
    Object.assign(game, {
      team1Goals: (Math.random() * 3) | 0,
      team2Goals: (Math.random() * 3) | 0,
      resultIsSet: true
    });

    this.setState(prevState => {
      prevState.fixtures
        .find(f => f.id === fixtureId)
        .games.map(g => g.id === game.id && game);
      return {
        fixtures: prevState.fixtures
      };
    });

    this.props.handler(game);
  };

  componentDidMount() {
    this._createGames();
  }

  render() {
    let { fixtures } = this.state;
    return (
      <div style={styles}>
        <h2>fixtures</h2>
        <ul>
          {fixtures.map(f => (
            <li key={f.id}>
              fixture no {f.id}
              <ol>
                {f.games.map(g => (
                  <li key={g.id}>
                    {" "}
                    {g.team1.name}{" "}
                    <input
                      disabled={g.resultIsSet}
                      name="team1Goals"
                      onChange={this.setScore.bind(this, f.id, g.id)}
                      value={g.team1Goals}
                      style={styles.scoreResult}
                    />{" "}
                    :{" "}
                    <input
                      disabled={g.resultIsSet}
                      name="team2Goals"
                      onChange={this.setScore.bind(this, f.id, g.id)}
                      value={g.team2Goals}
                      style={styles.scoreResult}
                    />
                    {g.team2.name}{" "}
                    {!g.resultIsSet && (
                      <button
                        disabled={g.team1Goals === "" || g.team2Goals === ""}
                        onClick={this.setResult.bind(this, f.id, g)}
                      >
                        set
                      </button>
                    )}
                    {!g.resultIsSet && (
                      <button onClick={() => this.simulateResult(f.id, g)}>
                        simulate
                      </button>
                    )}
                  </li>
                ))}
              </ol>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
