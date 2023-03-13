/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleImage } from '../../API/imageData';
import ThreadForm from '../../components/forms/ThreadForm';

export default function CreateThread() {
  const router = useRouter();
  const { firebaseKey } = router.query;
  const [image, setImage] = useState({});

  useEffect(() => {
    getSingleImage(firebaseKey).then(setImage);
  }, [firebaseKey]);

  return (
    <div>
      <img src={image.image_url} className="create-thread-image" />
      <div>
        <ThreadForm img={image} />
      </div>

    </div>
  );
}
