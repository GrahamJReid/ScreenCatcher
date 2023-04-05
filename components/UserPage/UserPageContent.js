/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { getAllUsersExcludeCurrentUser } from '../../API/userData';
import userspagestyle from '../../styles/users/UsersPage.module.css';
import { useAuth } from '../../utils/context/authContext';

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
  const { user } = useAuth();

  useEffect(() => {
    getAllUsersExcludeCurrentUser(user.uid).then((item) => {
      const sortedImageOrder = item.sort((b, a) => a.displayName.localeCompare(b.displayName));
      setOrder(sortedImageOrder);
    });
  });

  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      <div className={userspagestyle.UsersPageContainer}>
        <h1 className={userspagestyle.Title}>Users</h1>
        <div className={userspagestyle.SearchBarDiv}>
          <input type="text" placeholder="Search Users" onChange={(e) => setQuery(e.target.value)} className={userspagestyle.UsersPageSearchBar} />
        </div>
        <div>
          <div className={userspagestyle.UsersPageUserCardContainer}>
            {filteredItems.map((user) => (
              <Card className={userspagestyle.UsersPageUserCard} style={{ width: '18rem', color: 'black' }} key={user.uid}>
                <Card.Img className={userspagestyle.UsersPageUserCardImage} variant="top" src={user.photoURL} />
                <Card.Body className={userspagestyle.UsersPageUserCardBody}>
                  <Card.Title>{user.displayName}</Card.Title>
                  <Link href={`/Users/viewUser/${user.uid}`} passHref>
                    <button type="button" className={userspagestyle.ViewProfileButton}>View Profile</button>
                  </Link>
                </Card.Body>
              </Card>

            ))}
          </div>
        </div>
      </div>
    </>
  );
}
