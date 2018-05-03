import React from "react";
import robin from "roundrobin";

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
  }

  _createFixtures = () => {
    let { teams, revange } = this.props;
    revange = true;
    let fixtures = robin(teams.length, teams).map(function(games, i) {
      return {
        id: i + 1,
        games: games.map(function(game, index) {
          return {
            id: index + 1,
            team1: game[0],
            team2: game[1],
            team1Goals: "",
            team2Goals: ""
          };
        })
      };
    });

    if (revange) {
      let lastFixturesId = Math.max(...fixtures.map(f => f.id + 1));
      fixtures = [
        ...fixtures,
        ...fixtures.reverse().map(f =>
          Object.assign({}, f, {
            id: lastFixturesId++,
            games: f.games.map(g =>
              Object.assign({}, g, {
                team1: g.team2,
                team2: g.team1
              })
            )
          })
        )
      ];
    }

    this.setState({
      teams,
      fixtures: fixtures
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
      team1Goals: (Math.random() * 8) | 0,
      team2Goals: (Math.random() * 8) | 0,
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

  simulateAllGamesInFixture = (fixtureId, games) => {
    games.forEach(game => {
      !game.resultIsSet && this.simulateResult(fixtureId, game);
    });

    this.setState(prevState => {
      prevState.fixtures.find(f => f.id === fixtureId).completed = true;
      return {
        fixtures: prevState.fixtures
      };
    });
  };

  componentDidMount() {
    this._createFixtures();
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
              {!f.completed && (
                <button
                  onClick={() => this.simulateAllGamesInFixture(f.id, f.games)}
                >
                  simulate all games
                </button>
              )}
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
