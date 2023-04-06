/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { getThreads, getUserThreads } from '../../API/threadData';
import ThreadCard from '../../components/cards/ThreadCard';
import { useAuth } from '../../utils/context/authContext';
import threadspagestyles from '../../styles/Threads/ThreadsPage.module.css';

export default function ThreadsPage() {
  const { user } = useAuth();
  const [userThreads, setUserThreads] = useState([]);
  const [nonUserThreads, setNonUserThreads] = useState([]);

  useEffect(() => {
    getUserThreads(user.uid).then(setUserThreads);
  }, [user.uid]);

  useEffect(() => {
    getThreads(user.uid).then(setNonUserThreads);
  }, [user.uid]);

  return (
    <>
      <div className={threadspagestyles.PageWrapper}>
        <h1 className={threadspagestyles.ThreadsPageTitle}>Threads</h1>
        <div className={threadspagestyles.UsersThreadsDiv}>

          {userThreads.map((thread) => (
            <div className={threadspagestyles.InnerUsersThreadsDiv} key={thread.firebaseKey}>
              <ThreadCard threadObj={thread} />
            </div>
          ))}
        </div>
        <div className={threadspagestyles.UsersThreadsDiv}>
          {nonUserThreads.map((thread) => (
            <div className={threadspagestyles.InnerUsersThreadsDiv} key={thread.firebaseKey}>
              <ThreadCard threadObj={thread} />
            </div>
          ))}
        </div>
      </div>
    </>

  );
}
