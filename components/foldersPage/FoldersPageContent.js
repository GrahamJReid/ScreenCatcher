import React from 'react';
import styles from '../../styles/ImagesPage.module.css';

export default function FoldersPageContent() {
  return (
    <div id="gallery" className={styles.ImagesContentDivContainer}>
      <div className={styles.ImagesContentContainer}>
        <h1 className="gallery-title">Folders</h1>
        <input type="text" placeholder="search" />
      </div>
    </div>
  );
}
