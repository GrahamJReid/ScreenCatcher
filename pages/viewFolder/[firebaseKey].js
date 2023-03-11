/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getSingleFolder } from '../../API/folderData';
import {
  deleteFolderData, deleteFolderImageObj, getFolderImageObjectsByFolderId, getSingleFolderImageObj,
} from '../../API/folderImageData';
import { getImages } from '../../API/imageData';
import { useAuth } from '../../utils/context/authContext';
import viewfolderpagestyles from '../../styles/ViewFolderPage.module.css';

export default function ViewFolderPage() {
  const [folder, setFolder] = useState({});
  const [images, setImages] = useState([]);
  const { user } = useAuth();
  const router = useRouter();
  const { firebaseKey } = router.query;

  const getFolderImages = () => {
    getSingleFolder(firebaseKey).then(setFolder);
    getFolderImageObjectsByFolderId(firebaseKey).then((arr) => {
      const imageKeys = arr.map((item) => item.image_id);
      getImages().then((imagesArr) => {
        const imagesArray = imagesArr.filter((image) => imageKeys.includes(image.firebaseKey));
        setImages(imagesArray);
      });
    });
  };

  useEffect(() => {
    getFolderImages();
  }, [firebaseKey]);

  const deleteFolder = () => {
    if (window.confirm(`Delete ${folder.folder_title}?`)) {
      deleteFolderData(folder.firebaseKey).then(() => {
        router.push('/folders');
      });
    }
  };
  return (
    <>
      <Head>
        <title>Folder</title>
      </Head>
      <div className={viewfolderpagestyles.ViewFolderPageContainer}>
        <h1>{folder.folder_title} Folder</h1>
        <h2>Description:{folder.description}</h2>
        <h3>Category:{folder.category}</h3>
        {folder.uid === user.uid ? (
          <Button
            href={`/viewFolder/edit/${folder.firebaseKey}`}
          >
            Edit
          </Button>
        ) : ''}
        {folder.uid === user.uid ? (
          <Button onClick={deleteFolder}>
            Delete
          </Button>
        ) : ''}
        <div>
          <div className="image-page-container">{images.map((image) => (
            <div key={image.firebaseKey}>
              <Link key={image.firebaseKey} passHref href={`/viewImage/${image.firebaseKey}`}>
                <img src={`${image.image_url}`} height="50%" width="50%" className="image-page-image" />
              </Link>

              {folder.uid === user.uid ? (
                <Button onClick={() => {
                  getSingleFolderImageObj(folder.firebaseKey, image.firebaseKey).then((obj) => {
                    deleteFolderImageObj(obj.firebaseKey).then(getFolderImages);
                  });
                }}
                >Remove
                </Button>
              ) : ''}

            </div>
          ))}

          </div>
        </div>
      </div>
    </>
  );
}
