/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getSingleFolder } from '../../API/folderData';
import { getFolderImageObjectsByFolderId } from '../../API/folderImageData';
import { getImages } from '../../API/imageData';
import { useAuth } from '../../utils/context/authContext';

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
  return (
    <>
      <Head>
        <title>Folder</title>
      </Head>
      <div className="view-folder-page-container">
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
          <Button>
            Delete
          </Button>
        ) : ''}
        <div className="image-page-container">{images.map((image) => (
          <Link key={image.firebaseKey} passHref href={`/viewImage/${image.firebaseKey}`}>
            <img src={`${image.image_url}`} height="50%" width="50%" className="image-page-image" />
          </Link>
        ))}
        </div>
      </div>
    </>
  );
}
