import React from 'react';
import styles from '../../styles/ImagesFoldersPageLayout.module.css';

export default function ImagesPageContent() {
  return (
    <div id="gallery" className={styles.PageContentDivContainer}>
      <div className={styles.PageContentContainer}>
        <h1 className="gallery-title">Gallery</h1>
        <input type="text" placeholder="search" />
      </div>
    </div>
  );
}
