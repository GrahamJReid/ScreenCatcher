/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getSingleMessages } from '../../API/messagesData';
import { deletePostMessage } from '../../API/postMessageData';
import { getUser } from '../../API/userData';
import viewmessagesstyle from '../../styles/messages/ViewMessages.module.css';

function PostMessageCard({ postMessageObj, onUpdate }) {
  const deleteThisPostMessage = () => {
    if (window.confirm('Delete your message?')) {
      deletePostMessage(postMessageObj.firebaseKey).then(() => onUpdate());
    }
  };

  const { user } = useAuth();
  const [messages, setMessages] = useState({});
  const [authorObj, setAuthorObj] = useState({});

  useEffect(() => {
    getSingleMessages(postMessageObj.messages_id).then(setMessages);
  }, [postMessageObj.messages_id]);

  useEffect(() => {
    getUser(postMessageObj.uid).then(setAuthorObj);
  }, [postMessageObj.uid]);

  return (
    <>
      <Card className={(postMessageObj.uid) === (user.uid) ? viewmessagesstyle.PostCard : viewmessagesstyle.PostCardOther}>
        <div className="comment-container">
          <Card.Header>{postMessageObj.date_added}</Card.Header>
          <Card.Body>
            {postMessageObj.comment_image === ''
              ? <h4>User has removed Image</h4>
              : (
                <a href={`/viewImage/${postMessageObj.image_firebaseKey}`}>
                  {postMessageObj.comment_image ? <img className={viewmessagesstyle.PostMessageImage} src={postMessageObj.comment_image} /> : ''}
                </a>
              ) }

            <blockquote className="blockquote mb-0">
              <p className={viewmessagesstyle.MessageText}>

                {postMessageObj.text}

              </p>
              <footer className="blockquote-footer">
                {postMessageObj.uid === user.uid ? user.displayName : authorObj.displayName}
                {postMessageObj.uid === user.uid || user.displayName === messages.username
                  ? (
                    <Button
                      className={viewmessagesstyle.DeleteButton}
                      onClick={deleteThisPostMessage}
                    >
                      Delete
                    </Button>
                  ) : ''}
              </footer>
            </blockquote>
          </Card.Body>
        </div>
      </Card>
    </>
  );
}

PostMessageCard.propTypes = {
  postMessageObj: PropTypes.shape({
    messages_id: PropTypes.string,
    date_added: PropTypes.string,
    text: PropTypes.string,
    uid: PropTypes.string,
    firebaseKey: PropTypes.string,
    author: PropTypes.string,
    comment_image: PropTypes.string,
    image_firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PostMessageCard;
