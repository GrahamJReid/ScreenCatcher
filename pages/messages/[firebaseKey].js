import React from 'react';
import PostMessageForm from '../../components/forms/MessageForm';
import PostMessagesPageContent from '../../components/messages/PostMessagesPageContent';
import viewmessagesstyle from '../../styles/messages/ViewMessages.module.css';

export default function viewMessages() {
  return (
    <>
      <div>
        <div className={viewmessagesstyle.ViewMessagesPageWrapper}>
          <div>
            <PostMessagesPageContent />
          </div>

          <div className={viewmessagesstyle.PostFormDiv}>
            <PostMessageForm />
          </div>
        </div>
      </div>
    </>
  );
}
