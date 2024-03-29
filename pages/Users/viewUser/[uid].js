/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getUserPublicFolders } from '../../../API/folderData';
import {
  createFollowUserObj, deleteFollowUserObj, getFollowUserObjectsByFollowedUserUid, getSingleFollowUserObj, updateFollowUserObj,
} from '../../../API/followUserData';
import { getUserPublicImages } from '../../../API/imageData';
import { getUser } from '../../../API/userData';
import { useAuth } from '../../../utils/context/authContext';
import userpagestyle from '../../../styles/users/ViewUserPage.module.css';

export default function ViewUser() {
  const router = useRouter();
  const { uid } = router.query;
  const [followableUser, setFollowableUser] = useState({});
  const [images, setImages] = useState([]);
  const [folders, setFolders] = useState([]);
  const { user } = useAuth();
  const [btnToggle, setBtnToggle] = useState(0);
  const [numberOfFollowers, setNumberOfFollowers] = useState(0);
  const [contentToggle, setContentToggle] = useState(0);
  const [updateUserFollows, setUpdateUserFollows] = useState(0);
  const didMount = React.useRef(false);

  const handleFollow = () => {
    setBtnToggle(1);
    const userFollowPayload = {
      current_user: user.uid,
      followed_user: uid,
    };
    // eslint-disable-next-line no-shadow
    createFollowUserObj(userFollowPayload).then(({ name }) => {
      const patchFollowUserPayload = { firebaseKey: name };
      updateFollowUserObj(patchFollowUserPayload).then(() => setUpdateUserFollows(1));
    });
    getFollowUserObjectsByFollowedUserUid(uid)
      .then((arr) => setNumberOfFollowers(arr.length));
  };

  const handleUnfollow = async () => {
    setBtnToggle(0);
    getSingleFollowUserObj(user.uid, uid).then((followUserObj) => {
      deleteFollowUserObj(followUserObj.firebaseKey);
      setUpdateUserFollows(2);
    });
    getFollowUserObjectsByFollowedUserUid(uid)
      .then((arr) => setNumberOfFollowers(arr.length));
  };

  const handleContentImages = () => {
    setContentToggle(0);
  };

  const handleContentFolders = () => {
    setContentToggle(1);
  };

  useEffect(() => {
    getSingleFollowUserObj(user.uid, uid).then((item) => {
      if (item) {
        setBtnToggle(1);
      } else {
        setBtnToggle(0);
      }
    });
  }, [uid, user.uid]);

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

  useEffect(() => {
    getFollowUserObjectsByFollowedUserUid(uid)
      .then((arr) => setNumberOfFollowers(arr.length));
  }, [uid, user, updateUserFollows, numberOfFollowers]);

  useEffect(() => {
    if (didMount.current) {
      getFollowUserObjectsByFollowedUserUid(uid)
        .then((arr) => setNumberOfFollowers(arr.length));
    } else { didMount.current = true; }
  }, [uid, user, updateUserFollows, numberOfFollowers]);

  return (
    <div>
      <div className={userpagestyle.UserPageContainer}>
        <div className={userpagestyle.UserPageUserInfoDiv}>
          <img className={userpagestyle.UserImage} src={followableUser.photoURL} alt="user photo" />
          <h1 className={userpagestyle.UserName}>{followableUser.displayName}</h1>
          <h2>Followers:{numberOfFollowers}</h2>
          {btnToggle === 0
            ? <Button className={userpagestyle.ContentButton} onClick={handleFollow}>Follow</Button>
            : <Button className={userpagestyle.ContentButton} onClick={handleUnfollow}>Unfollow</Button>}
          <div className={userpagestyle.ContentButtonDiv}>
            <Button className={userpagestyle.ContentButton} onClick={handleContentImages}>Images</Button>
            <Button className={userpagestyle.ContentButton} onClick={handleContentFolders}>Folders</Button>
          </div>
        </div>
        {contentToggle === 0 ? (
          <div className={userpagestyle.UserImageDiv}>
            {images.map((image) => (
              <Link key={image.firebaseKey} passHref href={`/viewImage/${image.firebaseKey}`}>
                <img className={userpagestyle.UserPageImages} src={`${image.image_url}`} height="50%" width="50%" />
              </Link>
            ))}
          </div>
        ) : (
          <div className={userpagestyle.FoldersDiv}>{folders.map((folder) => (

            <div key={folder.firebaseKey}>
              <Link passHref href={`/Folders/viewFolder/${folder.firebaseKey}`}>
                <img src="https://img.icons8.com/color/512/mac-folder.png" height="50%" width="50%" className={userpagestyle.FolderPlaceholder} />
              </Link>
              <h1>{folder.folder_title}</h1>
            </div>
          ))}
          </div>
        ) }

      </div>
    </div>
  );
}
