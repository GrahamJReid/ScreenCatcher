import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getPostMessagesByMessagesId } from '../../API/postMessageData';
import PostMessageCard from './PostMessageCard';

export default function PostMessagesPageContent() {
  const [postMessages, setPostMessages] = useState([]);
  const router = useRouter();
  const { firebaseKey } = router.query;
  useEffect(() => {
    getPostMessagesByMessagesId(firebaseKey).then((item) => {
      const sortedImageOrder = item.sort((b, a) => a.date_added.localeCompare(b.date_added));
      setPostMessages(sortedImageOrder);
    });
  }, [firebaseKey, postMessages]);
  const displayPostMessages = () => {
    getPostMessagesByMessagesId(firebaseKey).then((item) => {
      const sortedImageOrder = item.sort((b, a) => a.date_added.localeCompare(b.date_added));
      setPostMessages(sortedImageOrder);
    });
  };

  return (
    <div>
      <div className="comment-cards-container">{postMessages.map((comment) => (
        <PostMessageCard key={comment.firebaseKey} postMessageObj={comment} onUpdate={displayPostMessages} />
      ))}
      </div>
    </div>
  );
}
