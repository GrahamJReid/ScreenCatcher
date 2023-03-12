/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getUserPublicFolders } from '../../API/folderData';
import { createFollowUserObj, updateFollowUserObj } from '../../API/followUserData';
import { getUserPublicImages } from '../../API/imageData';
import { getUser } from '../../API/userData';
import { useAuth } from '../../utils/context/authContext';

export default function ViewUser() {
  const router = useRouter();
  const { uid } = router.query;
  const [followableUser, setFollowableUser] = useState({});
  const [images, setImages] = useState([]);
  const [folders, setFolders] = useState([]);
  const { user } = useAuth();

  const handleFollow = () => {
    const userFollowPayload = {
      current_user: user.uid,
      followed_user: uid,
    };
    // eslint-disable-next-line no-shadow
    createFollowUserObj(userFollowPayload).then(({ name }) => {
      const patchFollowUserPayload = { firebaseKey: name };
      updateFollowUserObj(patchFollowUserPayload);
    });
  };

  useEffect(() => {
    getUser(uid).then((userDetails) => {
      setFollowableUser(userDetails);
    });
  }, [uid]);
  useEffect(() => {
    getUserPublicImages(uid).then((userImages) => {
      setImages(userImages);
    });
  }, [uid]);
  useEffect(() => {
    getUserPublicFolders(uid).then((userFolders) => {
      setFolders(userFolders);
    });
  }, [uid]);

  return (
    <div>
      <div className="view-single-user-page-container">
        <img src={followableUser.photoURL} alt="user photo" />
        <h1>{followableUser.displayName}</h1>
        <Button onClick={handleFollow}>Follow</Button>
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
