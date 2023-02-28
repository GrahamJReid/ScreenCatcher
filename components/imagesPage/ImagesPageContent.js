/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { getUserImages } from '../../API/imageData';

import imagepagestyles from '../../styles/ImagesPage.module.css';
import { useAuth } from '../../utils/context/authContext';

export default function ImagesPageContent() {
  const getFilteredItems = (query, order) => {
    if (!query) {
      return order;
    }
    return order.filter((image) => image.image_title.toLowerCase().includes(query.toLowerCase()) || image.category.toLowerCase().includes(query.toLowerCase()) || image.date_added.includes(query.toLowerCase()) || image.description.toLowerCase().includes(query.toLowerCase()));
  };

  const { user } = useAuth();
  const [order, setOrder] = useState([]);
  const [query, setQuery] = useState('');
  const filteredItems = getFilteredItems(query, order);

  useEffect(() => {
    getUserImages(user.uid).then((item) => {
      const sortedImageOrder = item.sort((b, a) => a.date_added.localeCompare(b.date_added));
      setOrder(sortedImageOrder);
    });
  }, [user.uid]);

  return (
    <>
      <Head>
        <title>Images</title>
      </Head>
      <div className={imagepagestyles.SearchBarDiv}>
        <input className={imagepagestyles.SearchBar} type="text" placeholder="Search Your Images" onChange={(e) => setQuery(e.target.value)} />
      </div>
      <div className={imagepagestyles.ContainImagePageContent}>
        <div>
          {filteredItems.map((image) => (
            <Link key={image.firebaseKey} passHref href={`/viewImage/${image.firebaseKey}`}>
              <img src={`${image.image_url}`} height="50%" width="50%" className={imagepagestyles.ImagesPageImage} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
