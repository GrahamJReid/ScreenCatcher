import React from 'react';
import UsersToMessage from '../components/messages/UsersToMessage';

export default function messages() {
  return (
    <div className="UsersPage-container">
      <div>
        current conversations
      </div>
      <div>
        <UsersToMessage />
      </div>
    </div>
  );
}
