/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import ImagesPageContent from '../components/imagesPage/ImagesPageContent';
import ImagesPageHero from '../components/imagesPage/ImagesPageHero';

export default function Images() {
  return (
    <>
      <div className="images-div-container">
        <ImagesPageHero />
        <ImagesPageContent />
      </div>
    </>
  );
}
