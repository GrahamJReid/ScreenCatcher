/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import ImageForm from '../components/forms/ImageForm';
import ImagesPageContent from '../components/imagesPage/ImagesPageContent';
import imagepagestyles from '../styles/ImagesPage.module.css';

export default function Images() {
  return (

    <div className={imagepagestyles.ImagePageWrapper}>
      <div className={imagepagestyles.ImageFormContainer}>
        <ImageForm />
      </div>

      <div className={imagepagestyles.ImagesPageContentContainer}>
        <ImagesPageContent />
      </div>

    </div>

  );
}
