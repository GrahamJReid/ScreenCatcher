/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { getAllUsers } from '../../API/userData';

export default function UsersPageContent() {
  const getFilteredItems = (query, order) => {
    if (!query) {
      return order;
    }
    return order.filter((user) => user.displayName.toLowerCase().includes(query.toLowerCase()));
  };

  const [order, setOrder] = useState([]);
  const [query, setQuery] = useState('');
  const filteredItems = getFilteredItems(query, order);

  useEffect(() => {
    getAllUsers().then((item) => {
      const sortedImageOrder = item.sort((b, a) => a.displayName.localeCompare(b.displayName));
      setOrder(sortedImageOrder);
    });
  });

  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      <div>
        <input type="text" placeholder="Search Your Images" onChange={(e) => setQuery(e.target.value)} />
      </div>
      <div>
        <div>
          {filteredItems.map((user) => (
            <Card style={{ width: '18rem', color: 'black' }} key={user.uid}>
              <Card.Img variant="top" src={user.photoURL} />
              <Card.Body>
                <Card.Title>{user.displayName}</Card.Title>
                <Card.Text>
                  other user info go here
                </Card.Text>
                <Link href={`/viewUser/${user.uid}`} passHref>
                  <h2>View Profile</h2>
                </Link>
              </Card.Body>
            </Card>

          ))}
        </div>
      </div>
    </>
  );
}
