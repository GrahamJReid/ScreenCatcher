/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { deleteThreadComments, getCommentsByThreadId } from '../../API/commentsData';
import {
  createFollowThreadObj, deleteFollowThreadObj, getAllFollowThreadObjbyThreadID, getSingleFollowThreadObj, updateFollowThreadObj,
} from '../../API/followThreadData';
import {
  createLike, deleteLike, getLikesByThreadId, getLikesByThreadIdandUid, updateLike,
} from '../../API/likeData';
import { getSingleThread } from '../../API/threadData';
import CommentCard from '../../components/cards/CommentCard';
import AddAComment from '../../components/forms/CommentForm';
import viewthreadstyle from '../../styles/Threads/viewThread.module.css';
import { useAuth } from '../../utils/context/authContext';

export default function ViewThread() {
  const router = useRouter();
  const { firebaseKey } = router.query;
  const [thread, setThread] = useState({});
  const [btnToggle, setBtnToggle] = useState(0);
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(0);
  const [buttonCount, setButtonCount] = useState(0);

  const displayComments = () => {
    getCommentsByThreadId(firebaseKey).then(setComments);
  };

  useEffect(() => {
    getCommentsByThreadId(firebaseKey).then(setComments);
    getLikesByThreadIdandUid(firebaseKey, user.uid).then((item) => {
      if (item.length === 0) {
        console.warn('user hasnt liked thread before');
      } else {
        setButtonCount(1);
      }
    });
  }, [firebaseKey, user.uid]);

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
        setButtonCount(1);
      });
    };
    createLikeFunc();
  };

  const handleUnlike = async () => {
    getLikesByThreadIdandUid(firebaseKey, user.uid).then((deleteItem) => {
      console.warn(deleteItem);
      deleteLike(deleteItem[0].firebaseKey);
      setButtonCount(0);
    });
    // eslint-disable-next-line no-unused-vars
    const updateLikes = await getLikesByThreadId(firebaseKey).then((likesArr) => {
      const setting = setLikes(likesArr.length);
      setLikes(setting);
    });
  };

  const handleDeleteThread = () => {
    if (window.confirm(`Delete ${thread.thread_title}?`)) {
      getLikesByThreadId(thread.firebaseKey).then((itemarr) => {
        itemarr.forEach((like) => {
          deleteLike(like.firebaseKey);
        });
      }).then(getAllFollowThreadObjbyThreadID(thread.firebaseKey).then((itemarr) => {
        itemarr.forEach((followThread) => {
          deleteFollowThreadObj(followThread.firebaseKey);
        });
      })).then(
        deleteThreadComments(thread.firebaseKey).then(() => router.push('/Threads/ThreadsPage')),
      );
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
      <h2>Category: {thread.category}</h2>
      <h3> Author: {thread.username}</h3>
      <h3>Description: {thread.description}</h3>
      {thread.thread_image === ''
        ? <img src="/logo.png" width="50%" />
        : <img src={thread.thread_image} className="create-thread-image" />}

      <div className={viewthreadstyle.ViewThreadButtonContainer}>
        {user.uid === thread.uid ? <Button className={viewthreadstyle.ViewThreadButton} onClick={handleDeleteThread}>Delete Thread</Button> : ''}

        {btnToggle === 0
          ? <Button className={viewthreadstyle.ViewThreadButton} onClick={handleFollow}>Follow</Button>
          : <Button className={viewthreadstyle.ViewThreadButton} onClick={handleUnfollow}>Unfollow</Button>}

        <div className={viewthreadstyle.LikesDiv}>

          <h2>{likes}</h2>

          {buttonCount === 0
            ? <Button className={viewthreadstyle.ViewThreadButton} onClick={handleLike}>LIKE</Button>
            : <Button className={viewthreadstyle.ViewThreadButton} onClick={handleUnlike}>UNLIKE</Button> }

        </div>
      </div>
      <div className={viewthreadstyle.CommentFormDiv}>
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
