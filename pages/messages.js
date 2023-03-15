import React from 'react';
import UsersToMessage from '../components/messages/UsersToMessage';

export default function messages() {
  return (
    <div className="UsersPage-container">
      <h1>Messages</h1>
      <div>
        current conversations
      </div>
      <div>
        <UsersToMessage />
      </div>
    </div>
  );
}
