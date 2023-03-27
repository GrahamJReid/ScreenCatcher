import Head from 'next/head';

import React, { useEffect, useState } from 'react';
import { getImages } from '../API/imageData';
import ImageEditor from '../components/ImageEditor';

export default function ImageEditorPage() {
  const [editItem, setEditItem] = useState({});

  useEffect(() => {
    getImages().then(setEditItem);
  }, []);
  console.warn(editItem);
  return (
    <>
      <Head>
        <title>Image Editor</title>
      </Head>
      <div>
        <div className="image-editor-page">
          <ImageEditor />
        </div>
      </div>
    </>
  );
}
