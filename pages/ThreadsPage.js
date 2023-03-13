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
                {threads.description}
              </Card.Text>
              <Link href={`/viewUser/${user.uid}`} passHref>
                <h2>View Thread</h2>
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
                  {threads.description}
                </Card.Text>
                <Link href={`/viewUser/${user.uid}`} passHref>
                  <h2>View Thread</h2>
                </Link>
              </Card.Body>
            </Card>

          ))}
        </div>

      </div>

    </div>
  );
}
