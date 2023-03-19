/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useState } from 'react';
import { getFollowThreadObjectsByCurrentUserUid } from '../../API/followThreadData';
import { getAllThreads } from '../../API/threadData';
import { useAuth } from '../../utils/context/authContext';
import ThreadCard from '../cards/ThreadCard';

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
        {followedThreads.map((thread) => (
          <ThreadCard threadObj={thread} />

        ))}
      </div>

    </div>
  );
}
