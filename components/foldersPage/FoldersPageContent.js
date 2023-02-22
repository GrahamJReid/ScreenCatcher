import React from 'react';
import styles from '../../styles/ImagesFoldersPageLayout.module.css';

export default function FoldersPageContent() {
  return (
    <div id="gallery" className={styles.PageContentDivContainer}>
      <div className={styles.PageContentContainer}>
        <h1 className="gallery-title">Folders</h1>
        <input type="text" placeholder="search" />
      </div>
    </div>
  );
}
