/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { deleteVideoComments, getCommentsByThreadId } from '../../../API/commentsData';
import {
  createFollowThreadObj, deleteFollowThreadObj, getSingleFollowThreadObj, updateFollowThreadObj,
} from '../../../API/followThreadData';
import { createLike, getLikesByThreadId, updateLike } from '../../../API/likeData';
import { getSingleThread } from '../../../API/threadData';
import CommentCard from '../../../components/CommentCard';
import AddAComment from '../../../components/forms/CommentForm';
import viewthreadstyle from '../../../styles/Threads/viewThread.module.css';
import { useAuth } from '../../../utils/context/authContext';

export default function ViewThread() {
  const router = useRouter();
  const { firebaseKey } = router.query;
  const [thread, setThread] = useState({});
  const [btnToggle, setBtnToggle] = useState(0);
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(0);

  const displayComments = () => {
    getCommentsByThreadId(firebaseKey).then(setComments);
  };
  useEffect(() => {
    getCommentsByThreadId(firebaseKey).then(setComments);
  }, [firebaseKey, likes]);

  useEffect(() => {
    getLikesByThreadId(firebaseKey).then((likesArr) => {
      setLikes(likesArr.length);
      console.warn('it updated agina via useEffect');
    });
  }, [firebaseKey, likes]);

  const handleLike = () => {
    const payload = {
      uid: user.uid,
      thread_id: firebaseKey,
    };

    const createLikeFunc = async () => {
      createLike(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateLike(patchPayload);
      });
      // eslint-disable-next-line no-unused-vars
      const updateLikes = await getLikesByThreadId(firebaseKey).then((likesArr) => {
        const setting = setLikes(likesArr.length);
        setLikes(setting);
      });
    };
    createLikeFunc();
  };
  const handleDeleteThread = () => {
    if (window.confirm(`Delete ${thread.thread_title}?`)) {
      deleteVideoComments(thread.firebaseKey).then(() => router.push('/ThreadsPage'));
    }
  };

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
      {user.uid === thread.uid ? <Button onClick={handleDeleteThread}>Delete Thread</Button> : ''}
      {btnToggle === 0 ? <Button onClick={handleFollow}>Follow</Button> : <Button onClick={handleUnfollow}>Unfollow</Button>}
      <h2>{likes}</h2>
      <Button onClick={handleLike}>LIKE</Button>
      <img src={thread.thread_image} className="create-thread-image" />
      <h2>Category: {thread.category}</h2>
      <h3>Description: {thread.description}</h3>
      <div className="comment-form">
        <AddAComment threadFbKey={firebaseKey} onUpdate={displayComments} />
      </div>
      <div className={viewthreadstyle.PostContainer}>
        <div className="comment-cards-container">{comments.map((comment) => (
          <CommentCard key={comment.firebaseKey} commentObj={comment} onUpdate={displayComments} />
        ))}
        </div>
      </div>
    </div>
  );
}
