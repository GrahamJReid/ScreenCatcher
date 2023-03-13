/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleThread } from '../../../API/threadData';
import viewthreadstyle from '../../../styles/Threads/viewThread.module.css';

export default function ViewThread() {
  const router = useRouter();
  const { firebaseKey } = router.query;
  const [thread, setThread] = useState({});

  useEffect(() => {
    getSingleThread(firebaseKey).then(setThread);
  }, [firebaseKey]);

  return (
    <div className={viewthreadstyle.ViewThreadContainer}>
      <h1>{thread.thread_title}</h1>
      <img src={thread.thread_image} className="create-thread-image" />
      <h2>Category: {thread.category}</h2>
      <h3>Description: {thread.description}</h3>
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
      <input type="text" />
    </div>
  );
}
