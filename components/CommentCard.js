/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { deleteComment } from '../API/commentsData';
import { useAuth } from '../utils/context/authContext';
import { getSingleThread } from '../API/threadData';
import viewthreadstyle from '../styles/Threads/viewThread.module.css';

function CommentCard({ commentObj, onUpdate }) {
  const deleteThisComment = () => {
    if (window.confirm('Delete your comment?')) {
      deleteComment(commentObj.firebaseKey).then(() => onUpdate());
    }
  };
  const { user } = useAuth();
  const [video, setVideo] = useState({});

  useEffect(() => {
    getSingleThread(commentObj.thread_id).then(setVideo);
  }, [commentObj.thread_id]);

  return (
    <>
      <Card className={viewthreadstyle.CommentCard} style={{ color: 'black' }}>
        <div className="comment-container">
          <Card.Header className={viewthreadstyle.CommentCardHeader}>{commentObj.date_added}</Card.Header>
          <Card.Body className={viewthreadstyle.CommentCardBody}>
            <Link passHref href={`/viewImage/${commentObj.thread_comment_image_firebaseKey}`}>
              <img className={viewthreadstyle.CommentCardImage} src={commentObj.comment_image} />
            </Link>
            <blockquote className="blockquote mb-0">
              <p>
                {' '}
                {commentObj.text}
                {' '}
              </p>
              <footer className="blockquote-footer">
                {commentObj.author}
                {commentObj.uid === user.uid || user.displayName === video.username
                  ? (
                    <Button
                      className={viewthreadstyle.CommentCardDeleteButton}
                      onClick={deleteThisComment}
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

CommentCard.propTypes = {
  commentObj: PropTypes.shape({
    thread_id: PropTypes.string,
    date_added: PropTypes.string,
    text: PropTypes.string,
    uid: PropTypes.string,
    firebaseKey: PropTypes.string,
    author: PropTypes.string,
    comment_image: PropTypes.string,
    thread_comment_image_firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default CommentCard;
