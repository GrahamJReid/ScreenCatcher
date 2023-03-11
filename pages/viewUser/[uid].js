/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getUserFolders } from '../../API/folderData';
import { getUserPublicImages } from '../../API/imageData';
import { getUser } from '../../API/userData';

export default function ViewUser() {
  const router = useRouter();
  const { uid } = router.query;
  const [user, setUser] = useState({});
  const [images, setImages] = useState([]);
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    getUser(uid).then((userDetails) => {
      setUser(userDetails);
    });
  }, [uid]);
  useEffect(() => {
    getUserPublicImages(uid).then((userImages) => {
      setImages(userImages);
    });
  }, [uid]);
  useEffect(() => {
    getUserFolders(uid).then((userFolders) => {
      setFolders(userFolders);
    });
  }, [uid]);

  return (
    <div>
      <div className="view-single-user-page-container">
        <img src={user.photoURL} alt="user photo" />
        <h1>{user.displayName}</h1>
        <div className="user-images">
          {images.map((image) => (
            <Link key={image.firebaseKey} passHref href={`/viewImage/${image.firebaseKey}`}>
              <img src={`${image.image_url}`} height="50%" width="50%" />
            </Link>
          ))}
        </div>
        <div>{folders.map((folder) => (

          <div key={folder.firebaseKey}>
            <Link passHref href={`/viewFolder/${folder.firebaseKey}`}>
              <img src="https://img.icons8.com/color/512/mac-folder.png" height="50%" width="50%" className="image-page-image" />
            </Link>
            <h1>{folder.folder_title}</h1>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}
