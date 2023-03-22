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
import { deleteFolderImageObj, getFolderImageObjBasedOnImageId } from '../../API/folderImageData';
import { storage } from '../../utils/client';

export default function ViewImage() {
  const [imageDetails, setImageDetails] = useState({});
  const [folderImage, setFolderImage] = useState([]);
  const router = useRouter();
  const { firebaseKey } = router.query;
  const { user } = useAuth();

  const deleteThisImage = () => {
    console.warn(folderImage);
    folderImage.map((item) => (
      deleteFolderImageObj(item.firebaseKey)
    ));
    const deleteImgFile = storage.ref(`images/${imageDetails.image_file}`);
    deleteImgFile.delete().then(() => {

    }).catch(() => {

    });
    deleteImage(imageDetails.firebaseKey).then(() => router.push('/images'));
  };

  useEffect(() => {
    getSingleImage(firebaseKey).then(setImageDetails);
    getFolderImageObjBasedOnImageId(firebaseKey).then(setFolderImage);
  }, [firebaseKey]);
  const payload = {
    date_added: new Date().toLocaleString(),
    sort_date: Date.now(),
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

        <h2>{imageDetails.image_title}</h2>

        <img className={styles.ViewImageImage} src={imageDetails.image_url} />

        <h6>Added by: {imageDetails.username} <br />
          {imageDetails.date_added}
        </h6>
        <p>Description: {imageDetails.description}</p>
        {imageDetails.public === false ? (
          <h5> Private</h5>
        ) : <h5> Public</h5>}
        <div className={styles.ViewImageButtonDiv}>
          {imageDetails.uid === user.uid ? (
            <Button
              className={styles.ViewImageButton}
              href={`/viewImage/edit/${imageDetails.firebaseKey}`}
            >
              Edit
            </Button>
          ) : ''}
          {imageDetails.uid === user.uid ? (
            <Button
              onClick={deleteThisImage}
              className={styles.ViewImageButton}
            >
              Delete
            </Button>
          ) : ''}
          {imageDetails.uid === user.uid && imageDetails.public === true ? (
            <Button
              href={`/threads/${imageDetails.firebaseKey}`}
              className={styles.ViewImageButton}
            >
              Create Thread
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
