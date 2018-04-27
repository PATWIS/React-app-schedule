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
