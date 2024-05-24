const Leaderboard = ({ data }) => {
  return (
    <div className="leaderboard">
      <table>
        <thead>
          <tr>
            <th>순위</th>
            <th>점수</th>
            <th>참가자</th>
          </tr>
        </thead>
        <tbody>
          {data.map((player) => (
            <tr key={player.username}>
              <td>{player.rank}</td>
              <td>{player.user_pts}</td>
              <td>{player.username}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
