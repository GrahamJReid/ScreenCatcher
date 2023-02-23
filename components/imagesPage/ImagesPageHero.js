/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styles from '../../styles/ImagesFoldersPageLayout.module.css';
import imagepagestyles from '../../styles/ImagesPage.module.css';
import ImageForm from '../forms/ImageForm';

export default function ImagesPageHero() {
  return (
    <div id="home" className={styles.HeroDivContainer}>

      <div className={styles.HeroContentContainer} />
      <div className={imagepagestyles.FormContainer}>
        <p className="hero-message"> Images Page</p>
        <div>
          <ImageForm />
        </div>
      </div>

    </div>
  );
}
