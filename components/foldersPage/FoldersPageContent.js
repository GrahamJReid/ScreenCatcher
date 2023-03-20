/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { getUserFolders } from '../../API/folderData';

import folderspagestyles from '../../styles/FoldersPage.module.css';
import { useAuth } from '../../utils/context/authContext';

export default function FoldersPageContent() {
  const getFilteredItems = (query, order) => {
    if (!query) {
      return order;
    }
    return order.filter((folder) => folder.folder_title.toLowerCase().includes(query.toLowerCase()) || folder.category.toLowerCase().includes(query.toLowerCase()) || folder.date_added.includes(query.toLowerCase()) || folder.description.toLowerCase().includes(query.toLowerCase()));
  };
  const { user } = useAuth();
  const [order, setOrder] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    getUserFolders(user.uid).then((item) => {
      const sortedFolderOrder = item.sort((b, a) => a.date_added.localeCompare(b.date_added));
      setOrder(sortedFolderOrder);
      console.warn(item.folder_title);
    });
  }, [user.uid]);

  const filteredItems = getFilteredItems(query, order);

  return (
    <>
      <Head>
        <title>Folders</title>
      </Head>
      <div className={folderspagestyles.FoldersPageContainer}>
        <div className={folderspagestyles.SearchBarContainer}>
          <input className={folderspagestyles.SearchBar} type="text" placeholder="Search Folders" onChange={(e) => setQuery(e.target.value)} />
        </div>
        <div className={folderspagestyles.FoldersPageContentContainer}>{filteredItems.map((folder) => (

          <div key={folder.firebaseKey} className={folderspagestyles.FolderAndTitleDiv}>
            <Link passHref href={`/viewFolder/${folder.firebaseKey}`}>
              <img src="https://img.icons8.com/color/512/mac-folder.png" height="50%" width="50%" className={folderspagestyles.FolderPlaceholder} />
            </Link>
            <h1>{folder.folder_title}</h1>
          </div>
        ))}
        </div>
      </div>
    </>
  );
}
