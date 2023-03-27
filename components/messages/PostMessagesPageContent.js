/* eslint-disable no-restricted-syntax */
/* eslint-disable no-inner-declarations */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getPostMessagesByMessagesId } from '../../API/postMessageData';
import { getSingleMessages } from '../../API/messagesData';
import PostMessageCard from '../cards/PostMessageCard';
import viewmessagesstyle from '../../styles/messages/ViewMessages.module.css';

export default function PostMessagesPageContent() {
  const [postMessages, setPostMessages] = useState([]);
  const [messages, setMessages] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getPostMessagesByMessagesId(firebaseKey).then((item) => {
      const sortedImageOrder = item.sort((b, a) => a.sort_date - (b.sort_date));
      setPostMessages(sortedImageOrder);
    });
  }, [firebaseKey, postMessages]);

  const displayPostMessages = () => {
    getPostMessagesByMessagesId(firebaseKey).then((item) => {
      const sortedImageOrder = item.sort((b, a) => a.sort_date - (b.sort_date));
      setPostMessages(sortedImageOrder);
    });
  };

  useEffect(() => {
    getSingleMessages(firebaseKey).then((item) => {
      setMessages(item);
    });
  }, [firebaseKey, postMessages]);

  return (
    <div>
      <h1 className={viewmessagesstyle.NamesTitle}> {`${messages.user_1name}`} & {`${messages.user_2name}`}</h1>
      <div id="messages" className={viewmessagesstyle.PostsDiv}>{postMessages.map((comment) => (
        <PostMessageCard key={comment.firebaseKey} postMessageObj={comment} onUpdate={displayPostMessages} />
      ))}
      </div>
    </div>
  );
}
