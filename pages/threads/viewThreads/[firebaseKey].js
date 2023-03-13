/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import {
  createFollowThreadObj, deleteFollowThreadObj, getSingleFollowThreadObj, updateFollowThreadObj,
} from '../../../API/followThreadData';
import { getSingleThread } from '../../../API/threadData';
import viewthreadstyle from '../../../styles/Threads/viewThread.module.css';
import { useAuth } from '../../../utils/context/authContext';

export default function ViewThread() {
  const router = useRouter();
  const { firebaseKey } = router.query;
  const [thread, setThread] = useState({});
  const [btnToggle, setBtnToggle] = useState(0);
  const { user } = useAuth();

  const handleFollow = () => {
    setBtnToggle(1);
    const userFollowPayload = {
      current_user: user.uid,
      followed_thread: thread.firebaseKey,
    };
    // eslint-disable-next-line no-shadow
    createFollowThreadObj(userFollowPayload).then(({ name }) => {
      const patchFollowUserPayload = { firebaseKey: name };
      updateFollowThreadObj(patchFollowUserPayload);
    });
  };

  const handleUnfollow = () => {
    setBtnToggle(0);
    getSingleFollowThreadObj(user.uid, thread.firebaseKey).then((followThreadObj) => {
      deleteFollowThreadObj(followThreadObj.firebaseKey);
    });
  };

  useEffect(() => {
    getSingleThread(firebaseKey).then(setThread);
  }, [firebaseKey]);
  useEffect(() => {
    getSingleFollowThreadObj(user.uid, thread.firebaseKey).then((item) => {
      if (item) {
        setBtnToggle(1);
      } else {
        setBtnToggle(0);
      }
    });
  }, [thread.firebaseKey, user.uid]);

  return (
    <div className={viewthreadstyle.ViewThreadContainer}>
      <h1>{thread.thread_title}</h1>
      {btnToggle === 0 ? <Button onClick={handleFollow}>Follow</Button> : <Button onClick={handleUnfollow}>Unfollow</Button>}
      <img src={thread.thread_image} className="create-thread-image" />
      <h2>Category: {thread.category}</h2>
      <h3>Description: {thread.description}</h3>
      <input type="text" />
      <div className={viewthreadstyle.PostContainer}>
        <h1>this is where the posts go</h1>
        <h1>this is where the posts go</h1>
        <h1>this is where the posts go</h1>
        <h1>this is where the posts go</h1>
        <h1>this is where the posts go</h1>
        <h1>this is where the posts go</h1>
        <h1>this is where the posts go</h1>
        <h1>this is where the posts go</h1>
        <h1>this is where the posts go</h1>
        <h1>this is where the posts go</h1>
        <h1>this is where the posts go</h1>
        <h1>this is where the posts go</h1>
        <h1>this is where the posts go</h1>
        <h1>this is where the posts go</h1>
        <h1>this is where the posts go</h1>
      </div>
    </div>
  );
}
