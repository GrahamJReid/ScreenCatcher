/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import Head from 'next/head';
import styles from '../../styles/ViewImagePage.module.css';

import { useAuth } from '../../utils/context/authContext';
import {
  createImage, deleteImage, getSingleImage, updateImage,
} from '../../API/imageData';
import FolderSelect from '../../components/FolderSelect';

export default function ViewImage() {
  const [imageDetails, setImageDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;
  const { user } = useAuth();

  const deleteThisImage = () => {
    if (window.confirm(`Delete ${imageDetails.image_title}?`)) {
      deleteImage(imageDetails.firebaseKey).then(() => router.push('/images'));
    }
  };

  useEffect(() => {
    getSingleImage(firebaseKey).then(setImageDetails);
  }, [firebaseKey]);
  const payload = {
    date_added: new Date().toLocaleString(),
    username: user.displayName,
    image_url: imageDetails.image_url,
    category: imageDetails.category,
    description: imageDetails.description,
    gallery: false,
    public: false,
    image_title: imageDetails.image_title,
    uid: user.uid,
    image_file: imageDetails.image_file,
  };

  const handleAdd = () => {
    createImage(payload).then(({ name }) => {
      const patchPayload = { firebaseKey: name };
      updateImage(patchPayload).then(() => {
        router.push('/images');
      });
    });
  };

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
        <p>Description: {imageDetails.description}</p>
        {imageDetails.public === false ? (
          <h5> Private</h5>
        ) : <h5> Public</h5>}
        <div>
          {imageDetails.uid === user.uid ? (
            <Button
              href={`/viewImage/edit/${imageDetails.firebaseKey}`}
            >
              Edit
            </Button>
          ) : ''}
          {imageDetails.uid === user.uid ? (
            <Button
              onClick={deleteThisImage}
            >
              Delete
            </Button>
          ) : ''}
          {imageDetails.uid === user.uid ? (
            <FolderSelect imageObj={imageDetails} />
          ) : <Button onClick={handleAdd}> Add To Your Images</Button>}
        </div>
        <div>
          {/* <CommentForm></CommentForm> */}

        </div>
      </div>
    </>
  );
}
