/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import Head from 'next/head';
import styles from '../../styles/Images/ViewImagePage.module.css';

import { useAuth } from '../../utils/context/authContext';
import {
  createImage, deleteImage, getImages, getSingleImage, updateImage,
} from '../../API/imageData';
import FolderSelect from '../../components/FolderSelect';
import { deleteFolderImageObj, getFolderImageObjBasedOnImageId } from '../../API/folderImageData';
import { storage } from '../../utils/client';
import { getThreadsByThreadImageFirebaseKey, getUserThreads, updateThread } from '../../API/threadData';
import { updateUser } from '../../API/userData';
import { getPostMessagesImageByImageFirebaseKey, updatePostMessage } from '../../API/postMessageData';
import { getCommentsImageByImageFirebaseKey, updateComment } from '../../API/commentsData';

export default function ViewImage() {
  const [imageDetails, setImageDetails] = useState({});
  const [folderImage, setFolderImage] = useState([]);
  const router = useRouter();
  const { firebaseKey } = router.query;
  const { user } = useAuth();
  const urlNeededArr = [];

  getImages().then((arr) => {
    arr.forEach((item) => {
      if (item.image_url === imageDetails.image_url) {
        urlNeededArr.push(item);
      }
    });
  });

  const deleteThisImage = () => {
    console.warn(folderImage);
    folderImage.map((item) => (
      deleteFolderImageObj(item.firebaseKey)
    ));

    getThreadsByThreadImageFirebaseKey(firebaseKey).then((arr) => {
      arr.forEach((item) => {
        const payload = {
          thread_image: '',
          firebaseKey: item.firebaseKey,
        };
        updateThread(payload);
      });
    });

    if (user.photoURL === imageDetails.image_url) {
      console.warn(user.displayName);
      const payload = {
        photoURL: '/logo.png',
        firebaseKey: user.firebaseKey,
      };
      updateUser(payload);
    }

    if (user.photoURL === imageDetails.image_url) {
      getUserThreads(user.uid).then((arr) => {
        arr.forEach((item) => {
          const payload = {
            user_image: '',
            firebaseKey: item.firebaseKey,
          };
          updateThread(payload);
        });
      });
    }

    getPostMessagesImageByImageFirebaseKey(firebaseKey).then((arr) => {
      arr.forEach((item) => {
        const payload = {
          comment_image: '',
          firebaseKey: item.firebaseKey,
        };
        updatePostMessage(payload);
      });
    });

    getCommentsImageByImageFirebaseKey(firebaseKey).then((arr) => {
      console.warn(arr);
      arr.forEach((item) => {
        const payload = {
          comment_image: '',
          firebaseKey: item.firebaseKey,
        };
        updateComment(payload);
      });
    });

    if (urlNeededArr.length === 1) {
      console.warn(urlNeededArr);
      const deleteImgFile = storage.ref(`images/${imageDetails.image_file}`);
      deleteImgFile.delete().then(() => {

      }).catch(() => {

      });
    } else {
      console.warn('Url still needed');
    }

    deleteImage(imageDetails.firebaseKey).then(() => router.push('/Images/images'));
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
        router.push('/Images/images');
      });
    });
  };

  return (
    <>
      <Head>
        <title>{imageDetails.image_title}</title>
      </Head>
      <div className={styles.ViewImageContainer}>

        <h2 className={styles.ImageTitle}>{imageDetails.image_title}</h2>
        <p className={styles.AboutImageText}>
          {imageDetails.date_added}
        </p>

        <p className={styles.AboutImageText}>Description: {imageDetails.description}</p>
        <p className={styles.AboutImageText}>category: {imageDetails.category}</p>
        {imageDetails.public === false ? (
          <h5 className={styles.AboutImageText}> Private</h5>
        ) : <h5 className={styles.AboutImageText}> Public</h5>}

        <img className={styles.ViewImageImage} src={imageDetails.image_url} />

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
            <FolderSelect className={styles.FolderSelect} imageObj={imageDetails} />
          ) : <Button className={styles.ViewImageButton} onClick={handleAdd}> Add To Your Images</Button>}
        </div>
        <div>
          {/* <CommentForm></CommentForm> */}

        </div>
      </div>
    </>
  );
}
