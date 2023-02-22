/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styles from '../../styles/ImagesFoldersPageLayout.module.css';

export default function ImagesPageHero() {
  return (
    <div id="home" className={styles.HeroDivContainer}>
      <div className={styles.HeroContentContainer}>
        <p className="hero-message"> Images Page</p>
      </div>

    </div>
  );
}
