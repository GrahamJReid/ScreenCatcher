/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { getPublicImages } from '../../API/imageData';
import { useAuth } from '../../utils/context/authContext';

export default function PublicImagesView() {
  const [order, setOrder] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    getPublicImages(user.uid).then((item) => {
      const sortedImageOrder = item.sort((a, b) => a.sort_date - (b.sort_date));
      setOrder(sortedImageOrder);
    });
  }, [user.uid]);

  return (
    <>
      <div className="public-image-page-container">{order.map((image) => (
        <Link key={image.firebaseKey} passHref href={`/viewImage/${image.firebaseKey}`}>
          <img src={`${image.image_url}`} height="25%" width="25%" className="image-page-image" />
        </Link>
      ))}
      </div>
    </>
  );
}
