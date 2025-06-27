import React, { useState, useEffect } from 'react';
import UserProfile from './UserProfile';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [actions, setActions] = useState([]);

  const fetchData = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    const userResponse = await fetch(`http://localhost:8080/users/${userId}`, { credentials: 'include' });
    if (!userResponse.ok) {
      console.error('Unauthorized or user not found');
      return;
    }

    const userData = await userResponse.json();
    setUser(userData);

    const actionsResponse = await fetch(`http://localhost:8080/actions/${userId}`, { credentials: 'include' });
    if (!actionsResponse.ok) {
      console.error('Unauthorized or failed to fetch actions');
      return;
    }

    const actionsData = await actionsResponse.json();
    setActions(actionsData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="profile-page">
      <UserProfile user={user} actions={actions} refreshActions={fetchData} />
    </div>
  );
};

export default Profile;
