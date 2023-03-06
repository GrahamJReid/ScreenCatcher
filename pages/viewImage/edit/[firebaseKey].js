import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleImage } from '../../../API/imageData';
import ImageForm from '../../../components/forms/ImageForm';
import ImageEditor from '../../../components/ImageEditor';
import viewimagepagestyle from '../../../styles/ViewImagePage.module.css';

export default function EditImagePage() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleImage(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (
    <>
      <Head>
        <title>Edit Image</title>
      </Head>
      <div>
        <div className={viewimagepagestyle.EditFormContainer}>
          <ImageEditor />
          <ImageForm obj={editItem} />
        </div>
      </div>
    </>
  );
}
