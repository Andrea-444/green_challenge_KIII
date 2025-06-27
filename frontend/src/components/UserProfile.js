import React, { useState } from 'react';
import ActionForm from './ActionForm';
import './UserProfile.css';
import { ECO_ACTIONS } from '../constants/ecoActions';

const LEVELS = [
  { name: "Eco Starter", points: 100 },
  { name: "Eco Hero", points: 250 },
  { name: "Eco Master", points: 500 },
  { name: "Eco Legend", points: 1000 }
];

const getNextLevel = (points) => {
  for (let lvl of LEVELS) {
    if (points < lvl.points) return lvl;
  }
  return LEVELS[LEVELS.length - 1];
};

const UserProfile = ({ user, actions, refreshActions }) => {
  const [editingActionId, setEditingActionId] = useState(null);
  const [newDescription, setNewDescription] = useState('');
  const [editActionType, setEditActionType] = useState('');
  const [editCustomDesc, setEditCustomDesc] = useState('');

  if (!user) return <div className="profile-card"><h2>Please register or login to view your profile.</h2></div>;

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:8080/actions/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (response.ok) {
      refreshActions();
    } else {
      alert('Failed to delete action.');
    }
  };

  const startEditing = (id, description, points) => {
    setEditingActionId(id);
    setEditActionType(ECO_ACTIONS.find(a => a.points === points)?.label || '');
    setEditCustomDesc(description !== editActionType ? description : '');
  };

  const handleEdit = async (id) => {
    const actionObj = ECO_ACTIONS.find(a => a.label === editActionType);
    if (!actionObj) {
      alert('Please select an action.');
      return;
    }
    const response = await fetch(`http://localhost:8080/actions/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        description: editCustomDesc || actionObj.label,
        points: actionObj.points
      })
    });

    if (response.ok) {
      refreshActions();
      setEditingActionId(null);
      setEditActionType('');
      setEditCustomDesc('');
    } else {
      alert('Failed to update action.');
    }
  };

  const nextLevel = getNextLevel(user.points);
  const prevLevelPoints = LEVELS.find(lvl => lvl.points < nextLevel.points)?.points || 0;
  const progress = Math.min(100, ((user.points - prevLevelPoints) / (nextLevel.points - prevLevelPoints)) * 100);

  return (
    <div className="profile-bg">
      <div className="profile-card">
        <div className="profile-header">
          <img
            src={`https://api.dicebear.com/8.x/adventurer/svg?seed=${user.username}`}
            alt="avatar"
            className="profile-avatar"
          />
          <div>
            <h2>{user.username}</h2>
            <div className="points-badge">
              <span role="img" aria-label="star">⭐</span> {user.points} points
            </div>
          </div>
        </div>
        <div className="progress-section">
          <div className="progress-label">
            <span>
              Level: <b>{nextLevel.name}</b>
            </span>
            <span style={{ marginLeft: '16px' }}>
              {user.points} / {nextLevel.points} pts
            </span>
          </div>
          <div className="progress-bar-bg">
            <div className="progress-bar-fg" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      <ActionForm refreshActions={refreshActions} />

      <div className="actions-section">
        <h3>Your Logged Actions</h3>
        <div className="card-container">
          {actions.length === 0 && <p className="no-actions">No actions logged yet. Start making an impact!</p>}
          {actions.map((action) => (
            <div key={action.id} className="action-card">
              {editingActionId === action.id ? (
                <>
                  <select
                    value={editActionType}
                    onChange={e => setEditActionType(e.target.value)}
                    className="edit-input"
                    required
                  >
                    <option value="">Select an action</option>
                    {ECO_ACTIONS.map(action => (
                      <option key={action.label} value={action.label}>
                        {action.label} (+{action.points} pts)
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={editCustomDesc}
                    onChange={e => setEditCustomDesc(e.target.value)}
                    className="edit-input"
                    placeholder="Add details (optional)"
                  />
                  <div className="action-btns">
                    <button className="btn save" onClick={() => handleEdit(action.id)}>Save</button>
                    <button className="btn cancel" onClick={() => setEditingActionId(null)}>Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <p className="action-date"><strong>📅</strong> {action.date}</p>
                  <p className="action-desc"><strong>🌿</strong> {action.description}</p>
                  <div className="action-footer">
                    <span className="points-tag">
                      +{action.points || 0} pts
                    </span>
                    <div className="action-btns">
                      <button className="btn edit" onClick={() => startEditing(action.id, action.description, action.points)}>Edit</button>
                      <button className="btn delete" onClick={() => handleDelete(action.id)}>Delete</button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
