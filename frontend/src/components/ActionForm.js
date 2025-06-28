import React, { useState } from 'react';
import { ECO_ACTIONS } from '../constants/ecoActions';

const ActionForm = ({ refreshActions }) => {
  const [selectedAction, setSelectedAction] = useState('');
  const [customDescription, setCustomDescription] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('Please login first.');
      return;
    }

    const actionObj = ECO_ACTIONS.find(a => a.label === selectedAction);
    if (!actionObj) {
      alert('Please select an action.');
      return;
    }

    const response = await fetch(`${process.env.REACT_APP_API_URL}/actions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        description: customDescription || actionObj.label,
        points: actionObj.points,
        user: { id: userId }
      })
    });

    if (response.ok) {
      // alert('Action logged!');
      setSelectedAction('');
      setCustomDescription('');
      if (refreshActions) refreshActions();
    } else {
      alert('Please make sure you are logged in.');
    }
  };

  return (
    <div className="action-form-container">
      <h2>Log Eco-Friendly Action</h2>
      <form onSubmit={handleSubmit}>
        <select
          value={selectedAction}
          onChange={e => setSelectedAction(e.target.value)}
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
          placeholder="Add details (optional)"
          value={customDescription}
          onChange={e => setCustomDescription(e.target.value)}
        />
        <button type="submit">Log Action</button>
      </form>
    </div>
  );
};

export default ActionForm;
