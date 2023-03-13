/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { getThreads, getUserThreads } from '../API/threadData';
import { useAuth } from '../utils/context/authContext';

export default function ThreadsPage() {
  const { user } = useAuth();
  const [userThreads, setUserThreads] = useState([]);
  const [nonUserthreads, setNonUserThreads] = useState([]);

  useEffect(() => {
    getUserThreads(user.uid).then(setUserThreads);
  }, [user.uid]);
  useEffect(() => {
    getThreads(user.uid).then(setNonUserThreads);
  }, [user.uid]);

  return (
    <div className="threads-page-container">
      <div>
        {userThreads.map((threads) => (
          <Card style={{ width: '18rem', color: 'black' }} key={threads.firebaseKey}>
            <Card.Img variant="top" src={threads.thread_image} />
            <Card.Body>
              <Card.Title>{threads.thread_title}</Card.Title>
              <Card.Text>
                Posted by:<img src={threads.user_image} />  {threads.username}
              </Card.Text>
              <Card.Text>
                {threads.description}
              </Card.Text>
              <Link href={`/threads/viewThreads/${threads.firebaseKey}`} passHref>
                <button type="button">View Thread</button>
              </Link>
            </Card.Body>
          </Card>

        ))}
      </div>
      <div>
        <div>
          {nonUserthreads.map((threads) => (
            <Card style={{ width: '18rem', color: 'black' }} key={threads.firebaseKey}>
              <Card.Img variant="top" src={threads.thread_image} />
              <Card.Body>
                <Card.Title>{threads.thread_title}</Card.Title>
                <Card.Text>
                  Posted by:<img src={threads.user_image} /> {threads.username}
                </Card.Text>
                <Card.Text>
                  {threads.description}
                </Card.Text>
                <Link href={`/threads/viewThreads/${threads.firebaseKey}`} passHref>
                  <button type="button">View Thread</button>
                </Link>
              </Card.Body>
            </Card>

          ))}
        </div>

      </div>

    </div>
  );
}
