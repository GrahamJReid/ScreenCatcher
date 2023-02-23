/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { getUserImages } from '../../API/imageData';

import styles from '../../styles/ImagesFoldersPageLayout.module.css';
import imagepagestyles from '../../styles/ImagesPage.module.css';
import { useAuth } from '../../utils/context/authContext';

export default function ImagesPageContent() {
  const { user } = useAuth();
  const [order, setOrder] = useState([]);

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
      <input type="input" />
      <div className="image-page-container">{order.map((image) => (
        <Link key={image.firebaseKey} passHref href={`/viewImage.js/${image.firebaseKey}`}>
          <img src={`${image.image_url}`} height="50%" width="50%" className="image-page-image" />
        </Link>
      ))}
      </div>
    </>
  );
}
