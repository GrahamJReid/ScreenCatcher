/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useAuth } from '../../utils/context/authContext';

export default function ThreadCard({ threadObj }) {
  const { user } = useAuth();
  return (
    <Card style={{ width: '18rem', color: 'black' }} key={threadObj.firebaseKey}>
      <Card.Img variant="top" src={threadObj.thread_image} />
      <Card.Body>
        <Card.Title>{threadObj.thread_title}</Card.Title>
        <Card.Text>
          Posted by:<img src={user.photoURL} width="50%" />  {threadObj.username}
        </Card.Text>
        <Card.Text>
          {threadObj.description}
        </Card.Text>
        <Link href={`/threads/viewThreads/${threadObj.firebaseKey}`} passHref>
          <button type="button">View Thread</button>
        </Link>
      </Card.Body>
    </Card>
  );
}

ThreadCard.propTypes = {
  threadObj: PropTypes.shape({
    category: PropTypes.string,
    date_added: PropTypes.string,
    description: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
    username: PropTypes.string,
    thread_title: PropTypes.string,
    thread_image: PropTypes.string,
  }).isRequired,
};
