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
        const imagesArray = imagesArr.filter((image) => imageKeys.includes(image.uid));
        setImages(imagesArray);
      });
    }, [user.uid]);
  });

  return (
    <div>

      <div className="public-image-page-container">{images.map((image) => (
        <Link key={image.firebaseKey} passHref href={`/viewImage/${image.firebaseKey}`}>
          <img src={`${image.image_url}`} height="25%" width="25%" className="image-page-image" />
        </Link>
      ))}
      </div>

    </div>
  );
}
