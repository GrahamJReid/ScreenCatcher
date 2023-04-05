/* eslint-disable object-curly-newline */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { getUserMessages, getUserSecondaryMessages } from '../../API/messagesData';
import { getAllUsersExcludeCurrentUser } from '../../API/userData';
import { useAuth } from '../../utils/context/authContext';
import userstomessagesstyle from '../../styles/messages/UsersToMessagePage.module.css';
import CreateMessagesModal from './CreateMessagesModal';

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
    getAllUsersExcludeCurrentUser(user.uid).then((item) => {
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
    <div>
      <Head>
        <title>Users</title>
      </Head>
      <div className={userstomessagesstyle.MessagesPageWrapper}>
        <div className={userstomessagesstyle.MessagesPageMessagesCardsDiv}>
          <h1 className={userstomessagesstyle.MessagesPageMessagesTitle}>Messages</h1>
          <div className={userstomessagesstyle.MessagesPageMessagesInnerContainer}>
            <div>
              {messagesArr.map((otherUser) => (
                <Card className={userstomessagesstyle.MessagesPageMessagesCards} style={{ width: '18rem', color: 'black' }} key={otherUser.firebaseKey}>
                  <Card.Img variant="top" src={otherUser.photoURL} />
                  <Card.Body className={userstomessagesstyle.MessagesPageMessagesCardsBody}>
                    <Card.Title>{otherUser.messages_title}</Card.Title>
                    <Card.Text className={userstomessagesstyle.MessagesPageMessagesCardsText}>
                      {user.displayName}&
                      {otherUser.user_2name}
                    </Card.Text>

                    <Button
                      className={userstomessagesstyle.MessagesPageMessagesCardsButton}
                      href={`/Messages/viewMessages/${otherUser.firebaseKey}`}
                    >
                      View Messages
                    </Button>

                  </Card.Body>
                </Card>

              ))}
            </div>
            <div>
              {secondaryMessagesArr.map((otherUser) => (
                <Card className={userstomessagesstyle.MessagesPageMessagesCards} style={{ width: '18rem', color: 'black' }} key={otherUser.firebaseKey}>
                  <Card.Img variant="top" src={otherUser.photoURL} />
                  <Card.Body className={userstomessagesstyle.MessagesPageMessagesCardsBody}>
                    <Card.Title>{otherUser.messages_title}</Card.Title>
                    <Card.Text className={userstomessagesstyle.MessagesPageMessagesCardsText}>
                      {otherUser.user_1name}&
                      {user.displayName}
                    </Card.Text>

                    <Button
                      className={userstomessagesstyle.MessagesPageMessagesCardsButton}
                      href={`/Messages/viewMessages/${otherUser.firebaseKey}`}
                    >
                      View Messages
                    </Button>

                  </Card.Body>
                </Card>

              ))}
            </div>
          </div>
        </div>

        <div className={userstomessagesstyle.MessagesPageUserCardsDiv}>
          <div className={userstomessagesstyle.MessagesPageSearchBarDiv}>
            <input className={userstomessagesstyle.MessagesPageSearchBar} type="text" placeholder="Search Users To Message" onChange={(e) => setQuery(e.target.value)} />
          </div>
          <div className={userstomessagesstyle.MessagesPageInnerCardDiv}>
            {filteredItems.map((otherUser) => (
              <Card className={userstomessagesstyle.MessagesPageUserCards} style={{ width: '30rem', color: 'black' }} key={otherUser.firebaseKey}>
                <Card.Img className={userstomessagesstyle.MessagesPageMessagesCardsImage} variant="top" src={otherUser.photoURL} />
                <Card.Body className={userstomessagesstyle.MessagesPageUserCardsBody}>
                  <Card.Title>{otherUser.displayName}</Card.Title>

                  <CreateMessagesModal otherUser={otherUser} />

                </Card.Body>
              </Card>

            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
