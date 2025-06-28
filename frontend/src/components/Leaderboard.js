import React, { useEffect, useState } from 'react';
import './Leaderboard.css';

const medalEmojis = ['🥇', '🥈', '🥉'];

const Leaderboard = () => {
  const [users, setUsers] = useState([]);

  const fetchLeaderboard = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/users/leaderboard`, { credentials: 'include' });
    if (response.ok) {
      const data = await response.json();
      setUsers(data);
    } else {
      console.error('Failed to fetch leaderboard');
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return (
    <div className="leaderboard-container">
      <h2>🏆 Top Green Challengers</h2>
      <div className="leaderboard-list">
        {users.length === 0 ? (
          <p>No users yet.</p>
        ) : (
          users.map((user, index) => (
            <div key={user.id} className={`leaderboard-card ${index < 3 ? 'top-card' : ''}`}>
              <div className="leaderboard-avatar-wrap">
                <img
                  src={`https://api.dicebear.com/8.x/adventurer/svg?seed=${user.username}`}
                  alt="avatar"
                  className="leaderboard-avatar"
                />
                {index < 3 && (
                  <span className="medal-badge" title={`Rank ${index + 1}`}>
                    {medalEmojis[index]}
                  </span>
                )}
              </div>
              <div className="leaderboard-user-info">
                <h3>#{index + 1} {user.username}</h3>
                <div className="leaderboard-points">
                  <span role="img" aria-label="star">⭐</span> {user.points} pts
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
