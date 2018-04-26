import * as React from "react";

export class Table extends React.Component {
  render() {
    const { teams } = this.props;

    // const teams = [{ name: "team1" }, { name: "team2" }];

    return (
      <div>
        <table>
          <tr>
            <th>#</th>
          </tr>
          <tbody>
            {teams
              .sort((a, b) => {
                if (a.totalPoints === b.totalPoints) {
                  return (
                    a.scoredGoals - a.lostGoals < b.scoredGoals - a.lostGoals
                  );
                }
                return a.totalPoints < b.totalPoints;
              })
              .map((t, i) => (
                <tr>
                  <td>{i + 1}</td>
                  <td>{t.name}</td>
                  <td>{t.matches}</td>
                  <td>{t.scoredGoals}</td>
                  <td>{t.lostGoals}</td>
                  <td>
                    {t.scoredGoals - t.lostGoals > 0 ? (
                      <span>+{t.scoredGoals - t.lostGoals}</span>
                    ) : (
                      t.scoredGoals - t.lostGoals
                    )}
                  </td>

                  <td>{t.totalPoints}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}
