import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleImage } from '../../../API/imageData';
import ImageForm from '../../../components/forms/ImageForm';

export default function EditPlaylistPage() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleImage(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (
    <>
      <Head>
        <title>Edit Playlist</title>
      </Head>
      <div>
        <div className="edit-Image-container">
          <ImageForm obj={editItem} />
        </div>
      </div>
    </>
  );
}
