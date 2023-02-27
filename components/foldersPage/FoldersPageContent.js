/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { getUserFolders } from '../../API/folderData';

import imagepagestyles from '../../styles/ImagesPage.module.css';
import { useAuth } from '../../utils/context/authContext';

export default function FoldersPageContent() {
  const { user } = useAuth();
  const [order, setOrder] = useState([]);

  useEffect(() => {
    getUserFolders(user.uid).then((item) => {
      const sortedFolderOrder = item.sort((b, a) => a.date_added.localeCompare(b.date_added));
      setOrder(sortedFolderOrder);
      console.warn(item.folder_title);
    });
  }, [user.uid]);

  return (
    <>
      <Head>
        <title>Folders</title>
      </Head>
      <div>
        <input type="input" />
        <div className="folder-page-container">{order.map((folder) => (

          <div key={folder.firebaseKey}>
            <Link passHref href={`/viewFolder/${folder.firebaseKey}`}>
              <img src="https://img.icons8.com/color/512/mac-folder.png" height="50%" width="50%" className="image-page-image" />
            </Link>
            <h1>{folder.folder_title}</h1>
          </div>
        ))}
        </div>
      </div>
    </>
  );
}
