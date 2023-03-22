/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleImage } from '../../API/imageData';
import ThreadForm from '../../components/forms/ThreadForm';
import threadformstyles from '../../styles/Threads/ThreadForm.module.css';

export default function CreateThread() {
  const router = useRouter();
  const { firebaseKey } = router.query;
  const [image, setImage] = useState({});

  useEffect(() => {
    getSingleImage(firebaseKey).then(setImage);
  }, [firebaseKey]);

  return (
    <div className={threadformstyles.ThreadFormContentWrapper}>
      <img className={threadformstyles.ThreadFormImage} src={image.image_url} />
      <div className={threadformstyles.ThreadFormDiv}>
        <ThreadForm img={image} />
      </div>

    </div>
  );
}
