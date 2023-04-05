/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

import threadcardstyle from '../../styles/Threads/ThreadCard.module.css';

export default function ThreadCard({ threadObj }) {
  return (
    <Card style={{ width: '25rem', color: 'black' }} key={threadObj.firebaseKey} className={threadcardstyle.ThreadCardContainer}>

      <Card.Title className={threadcardstyle.ThreadTitle}>{threadObj.thread_title}</Card.Title>

      <Link href={`/viewThreads/${threadObj.firebaseKey}`} passHref>
        {threadObj.thread_image === ''
          ? <div className={threadcardstyle.ThreadCardImagePlaceholderDiv}><img className={threadcardstyle.ThreadCardImagePlaceholder} src="/logo.png" width="100%" /></div>
          : <Card.Img variant="top" src={threadObj.thread_image} className={threadcardstyle.ThreadCardImage} /> }
      </Link>

      <Card.Body className={threadcardstyle.ThreadCardBody}>
        <div className={threadcardstyle.AuthorInfoContainer}>
          {threadObj.user_image === ''
            ? <img className={threadcardstyle.ThreadCardAuthorImage} src="/logo.png" width="10%" />
            : <img src={threadObj.user_image} width="50%" className={threadcardstyle.ThreadCardAuthorImage} /> }
          <div className={threadcardstyle.ThreadAuthorUsername}>{threadObj.username}</div>
        </div>
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
    user_image: PropTypes.string,
  }).isRequired,
};
