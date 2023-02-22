import React from 'react';
import styles from '../../styles/ImagesFoldersPageLayout.module.css';
import imagepagestyles from '../../styles/ImagesPage.module.css';

export default function ImagesPageContent() {
  return (
    <div id="gallery" className={styles.PageContentDivContainer}>
      <div className={styles.PageContentContainer}>
        <h1 className={imagepagestyles.Title}>Images</h1>
        <input type="text" placeholder="search" />
      </div>
    </div>
  );
}
