/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import ImagePageContent from '../components/imagesPage/ImagePageContent';
import ImagePageHero from '../components/imagesPage/ImagePageHero';

export default function Images() {
  return (
    <>
      <div className="images-div-container">
        <ImagePageHero />
        <ImagePageContent />
      </div>
    </>
  );
}
