/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import Head from 'next/head';
import styles from '../../styles/ViewImagePage.module.css';

import { useAuth } from '../../utils/context/authContext';
import { deleteImage, getSingleImage } from '../../API/imageData';

export default function ViewImage() {
  const [imageDetails, setImageDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;
  const { user } = useAuth();

  const deleteThisVideo = () => {
    if (window.confirm(`Delete ${imageDetails.image_title}?`)) {
      deleteImage(imageDetails.firebaseKey).then(() => router.push('/images'));
    }
  };

  useEffect(() => {
    getSingleImage(firebaseKey).then(setImageDetails);
  }, [firebaseKey]);

  return (
    <>
      <Head>
        <title>{imageDetails.image_title}</title>
      </Head>
      <div className={styles.ViewImageContainer}>

        <img className={styles.ViewImageImage} src={imageDetails.image_url} />

        <h2>{imageDetails.image_title}</h2>
        <h6>Added by: {imageDetails.username} <br />
          {imageDetails.date_added}
        </h6>
        <p>{imageDetails.description}</p>
        <div>
          {imageDetails.uid === user.uid ? (
            <Button
              href={`/viewImage.js/edit/${imageDetails.firebaseKey}`}
            >
              Edit
            </Button>
          ) : ''}
          {imageDetails.uid === user.uid ? (
            <Button
              onClick={deleteThisVideo}
            >
              Delete
            </Button>
          ) : ''}
          {imageDetails.public === false ? (
            <h5>&#128274; Private</h5>
          ) : <h5>&#127758; Public</h5>}
        </div>
        <div>
          {/* <CommentForm></CommentForm> */}

        </div>
      </div>
    </>
  );
}
