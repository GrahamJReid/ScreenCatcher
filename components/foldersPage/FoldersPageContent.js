import React from 'react';
import styles from '../../styles/ImagesFoldersPageLayout.module.css';
import folderpagestyles from '../../styles/FoldersPage.module.css';

export default function FoldersPageContent() {
  return (
    <div id="gallery" className={styles.PageContentDivContainer}>
      <div className={styles.PageContentContainer}>
        <h1 className={folderpagestyles.ContentTitle}>Folders</h1>
        <input type="text" placeholder="search" />
      </div>
    </div>
  );
}
