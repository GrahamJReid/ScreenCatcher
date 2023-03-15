import React from 'react';
import PostMessageForm from '../../components/forms/MessageForm';
import PostMessagesPageContent from '../../components/messages/PostMessagesPageContent';

export default function viewMessages() {
  return (
    <>
      <div>
        <PostMessagesPageContent />
      </div>

      <div>
        <PostMessageForm />
      </div>
    </>
  );
}
