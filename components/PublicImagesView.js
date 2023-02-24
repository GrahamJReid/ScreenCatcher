/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { getPublicImages } from '../API/imageData';

export default function PublicImagesView() {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    getPublicImages().then((item) => {
      const sortedImageOrder = item.sort((b, a) => a.date_added.localeCompare(b.date_added));
      setOrder(sortedImageOrder);
    });
  }, []);

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
