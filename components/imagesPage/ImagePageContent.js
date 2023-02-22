import React from 'react';
import styles from '../../styles/ImagesPage.module.css';

export default function ImagePageContent() {
  return (
    <div id="gallery" className={styles.ImagesContentDivContainer}>
      <div className={styles.ImagesContentContainer}>
        <h1 className="gallery-title">Gallery</h1>
        <input type="text" placeholder="search" />
      </div>
    </div>
  );
}
