import React from "react";

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
    this.createSchedule();
    this.setState({ teams: nextProps.teams });
  }

  createSchedule = () => {
    let { teams } = this.state;
    let matches = [];

    // game + revange
    // teams.forEach(team => {
    //   team.opponents.forEach(o => {
    //     matches.push({
    //       id: matches.length + 1,
    //       team1: team.name,
    //       team2: o.name
    //     });
    //   });
    // });

    teams.forEach(team => {
      team.opponents.forEach(o => {
        var obj = matches.find(function(obj) {
          return (
            (obj.team1 === o.name || obj.team1 === team.name) &&
            (obj.team2 === o.name || obj.team2 === team.name)
          );
        });

        if (!obj) {
          matches.push({
            id: matches.length + 1,
            team1: team.name,
            team2: o.name,
            team1Score: "",
            team2Score: "",
            resultIsSet: false
          });
        }
      });
    });

    this.setState({
      games: matches
    });
  };

  componentDidMount() {
    this.setState({
      teams: this.props.teams
    });
  }

  render() {
    let { games, teams } = this.state;
    return (
      <div style={styles}>
        {teams.length > 0 && (
          <div>
            {" "}
            <h2>Schedule</h2>
            <ul>
              {games.map(e => (
                <li key={e.id}>
                  game {e.id}: {e.team1} vs {e.team2}{" "}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}
