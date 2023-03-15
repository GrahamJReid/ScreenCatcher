/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getSingleMessages } from '../../API/messagesData';
import { deletePostMessage } from '../../API/postMessageData';

function PostMessageCard({ postMessageObj, onUpdate }) {
  const deleteThisPostMessage = () => {
    if (window.confirm('Delete your message?')) {
      deletePostMessage(postMessageObj.firebaseKey).then(() => onUpdate());
    }
  };
  const { user } = useAuth();
  const [video, setVideo] = useState({});

  useEffect(() => {
    getSingleMessages(postMessageObj.messages_id).then(setVideo);
  }, [postMessageObj.messages_id]);

  return (
    <>
      <Card className="comment-card" style={{ color: 'black' }}>
        <div className="comment-container">
          <Card.Header>{postMessageObj.date_added}</Card.Header>
          <Card.Body>
            <img src={postMessageObj.comment_image} width="200px" />
            <blockquote className="blockquote mb-0">
              <p>
                {' '}
                {postMessageObj.text}
                {' '}
              </p>
              <footer className="blockquote-footer">
                {postMessageObj.author}
                {postMessageObj.uid === user.uid || user.displayName === video.username
                  ? (
                    <Button
                      className="red-btn comment-btn"
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
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PostMessageCard;