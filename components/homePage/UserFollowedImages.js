/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { getFollowUserObjectsByCurrentUserUid } from '../../API/followUserData';
import { getImages } from '../../API/imageData';
import { useAuth } from '../../utils/context/authContext';

export default function UserFollowedImages() {
  const [images, setImages] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    getFollowUserObjectsByCurrentUserUid(user.uid).then((followUserArr) => {
      const imageKeys = followUserArr.map((item) => item.followed_user);
      getImages().then((imagesArr) => {
        const imagesArray = imagesArr.filter((image) => imageKeys.includes(image.uid) && image.public === true);
        const sortedImageOrder = imagesArray.sort((a, b) => b.sort_date - (a.sort_date));
        setImages(sortedImageOrder);
      });
    }, [user.uid]);
  });

  const pushedArray1 = [];
  for (let i = 0; i < images.length; i += 3) {
    pushedArray1.push(images[i]);
  }
  const pushedArray2 = [];
  for (let i = 1; i < images.length; i += 3) {
    pushedArray2.push(images[i]);
  }
  const pushedArray3 = [];
  for (let i = 2; i < images.length; i += 3) {
    pushedArray3.push(images[i]);
  }
  return (
    <>
      <div className="public-image-page-column-container">
        <div className="public-image-page-column">{pushedArray1.map((image) => (
          <Link key={image.firebaseKey} passHref href={`/viewImage/${image.firebaseKey}`} className="follow-user-image-link">
            <img src={`${image.image_url}`} className="user-followed-image" />
          </Link>
        ))}
        </div>
        <div className="public-image-page-column">{pushedArray2.map((image) => (
          <Link key={image.firebaseKey} passHref href={`/viewImage/${image.firebaseKey}`} className="follow-user-image-link">
            <img src={`${image.image_url}`} className="user-followed-image" />
          </Link>
        ))}
        </div>
        <div className="public-image-page-column">{pushedArray3.map((image) => (
          <Link key={image.firebaseKey} passHref href={`/viewImage/${image.firebaseKey}`} className="follow-user-image-link">
            <img src={`${image.image_url}`} className="user-followed-image" />
          </Link>
        ))}
        </div>
      </div>
    </>
  );
}
