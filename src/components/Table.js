import * as React from "react";

export class Table extends React.Component {
  render() {
    const { teams } = this.props;

    // const teams = [{ name: "team1" }, { name: "team2" }];

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Total Matches</th>
              <th>Wins</th>
              <th>Draws</th>
              <th>Losts</th>
              <th>Scored Goals</th>
              <th>Lost Goals</th>
              <th>Bilans</th>
              <th>POINTS</th>
            </tr>
          </thead>
          <tbody>
            {teams
              .sort((a, b) => {
                if (a.totalPoints === 0 && b.totalPoints === 0) {
                  return a.id - b.id;
                }

                if (a.totalPoints === b.totalPoints) {
                  return (
                    b.scoredGoals - b.lostGoals - (a.scoredGoals - a.lostGoals)
                  );
                }
                return b.totalPoints - a.totalPoints;
              })
              .map((t, i) => (
                <tr>
                  <td>{i + 1}</td>
                  <td>{t.name}</td>
                  <td>{t.matches}</td>
                  <td>{t.wins}</td>
                  <td>{t.draws}</td>
                  <td>{t.losts}</td>
                  <td>{t.scoredGoals}</td>
                  <td>{t.lostGoals}</td>
                  <td>
                    {t.scoredGoals - t.lostGoals > 0 ? (
                      <span>+{t.scoredGoals - t.lostGoals}</span>
                    ) : (
                      t.scoredGoals - t.lostGoals
                    )}
                  </td>

                  <td>
                    <b>{t.totalPoints}</b>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}
