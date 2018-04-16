import React from "react";
// import Team from "../models/Team";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

export class Teams extends React.Component {
  state = {
    teams: []
  };

  handler(id, event) {
    this.props.handler(id, event.target.value);
  }

  handleChangeName = (id, event) => {
    let { teams } = this.state;
    teams[id - 1].name = event.target.value;
    this.setState({ teams });
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ teams: nextProps.teams });
  }

  componentDidMount() {
    this.setState({ teams: this.props.teams });
  }

  render() {
    let { teams } = this.state;
    return (
      <div style={styles}>
        <h2>Teams</h2>
        <ol>
          {teams.map(t => (
            <li key={t.id}>
              <input
                value={teams[t.id - 1].name}
                onChange={this.handler.bind(this, t.id)}
              />
              Total Points: {t.totalPoints}
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

// <input
//   value={teams[t.id - 1].name}
//   onChange={this.handleChangeName.bind(this, t.id)}
// />
