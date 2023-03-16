/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { getFollowThreadObjectsByCurrentUserUid } from '../../API/followThreadData';
import { getAllThreads } from '../../API/threadData';
import { useAuth } from '../../utils/context/authContext';

export default function UserFollowedThreads() {
  const [followedThreads, setFollowedThreads] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    getFollowThreadObjectsByCurrentUserUid(user.uid).then((followUserArr) => {
      const imageKeys = followUserArr.map((item) => item.followed_thread);
      getAllThreads().then((imagesArr) => {
        const imagesArray = imagesArr.filter((image) => imageKeys.includes(image.firebaseKey));
        setFollowedThreads(imagesArray);
      });
    }, [user.uid]);
  });
  // console.warn(followedThreads);
  return (
    <div>

      <div>
        {followedThreads.map((threads) => (
          <Card style={{ width: '18rem', color: 'black' }} key={threads.firebaseKey}>
            <Card.Img variant="top" src={threads.thread_image} />
            <Card.Body>
              <Card.Title>{threads.thread_title}</Card.Title>
              <Card.Text>
                Posted by:<img src={user.photoURL} width="100px" /> {threads.username}
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
  );
}
