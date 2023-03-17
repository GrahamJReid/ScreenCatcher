/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import {
  createMessages, getUserMessages, getUserSecondaryMessages, updateMessages,
} from '../../API/messagesData';
import { getAllUsers } from '../../API/userData';
import { useAuth } from '../../utils/context/authContext';

export default function UsersToMessage() {
  const getFilteredItems = (query, order) => {
    if (!query) {
      return order;
    }
    return order.filter((user) => user.displayName.toLowerCase().includes(query.toLowerCase()));
  };

  const [order, setOrder] = useState([]);
  const [query, setQuery] = useState('');
  const filteredItems = getFilteredItems(query, order);
  const { user } = useAuth();
  const [messagesArr, setMessagesArr] = useState([]);
  const [secondaryMessagesArr, setSecondaryMessagesArr] = useState([]);

  useEffect(() => {
    getAllUsers().then((item) => {
      const sortedImageOrder = item.sort((b, a) => a.displayName.localeCompare(b.displayName));
      setOrder(sortedImageOrder);
    });
  });

  useEffect(() => {
    getUserMessages(user.uid).then(setMessagesArr).then(
      getUserSecondaryMessages(user.uid).then(setSecondaryMessagesArr),
    );
  }, [user.uid]);

  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      <div>
        {messagesArr.map((otherUser) => (
          <Card style={{ width: '18rem', color: 'black' }} key={otherUser.firebaseKey}>
            <Card.Img variant="top" src={otherUser.photoURL} />
            <Card.Body>
              <Card.Title>{otherUser.displayName}</Card.Title>
              <Card.Text>
                {user.displayName}&
                {otherUser.user_2name}
              </Card.Text>

              <Button
                href={`/messages/${otherUser.firebaseKey}`}
              >
                View Messages
              </Button>

            </Card.Body>
          </Card>

        ))}
      </div>
      <div>
        {secondaryMessagesArr.map((otherUser) => (
          <Card style={{ width: '18rem', color: 'black' }} key={otherUser.firebaseKey}>
            <Card.Img variant="top" src={otherUser.photoURL} />
            <Card.Body>
              <Card.Title>{otherUser.displayName}</Card.Title>
              <Card.Text>
                {otherUser.user_1name}&
                {user.displayName}
              </Card.Text>

              <Button
                href={`/messages/${otherUser.firebaseKey}`}
              >
                View Messages
              </Button>

            </Card.Body>
          </Card>

        ))}
      </div>

      <div>
        <input type="text" placeholder="Search Your Images" onChange={(e) => setQuery(e.target.value)} />
      </div>
      <div>
        {filteredItems.map((otherUser) => (
          <Card style={{ width: '18rem', color: 'black' }} key={otherUser.firebaseKey}>
            <Card.Img variant="top" src={otherUser.photoURL} />
            <Card.Body>
              <Card.Title>{otherUser.displayName}</Card.Title>
              <Card.Text>
                other user info go here
              </Card.Text>

              <button
                type="button"
                onClick={() => {
                  const payload = {
                    user_1: user.uid,
                    user_2: otherUser.uid,
                    user_1name: user.displayName,
                    user_2name: otherUser.displayName,
                    date_added: new Date().toLocaleString(),
                    author: user.displayName,
                  };
                  createMessages(payload).then(({ name }) => {
                    const patchPayload = { firebaseKey: name };
                    updateMessages(patchPayload)
                      .then(() => {
                        getUserMessages(user.uid).then(setMessagesArr);
                      });
                  });
                }}
              >create messages
              </button>

            </Card.Body>
          </Card>

        ))}
      </div>

    </>
  );
}
