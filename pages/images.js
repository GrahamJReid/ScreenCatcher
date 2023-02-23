/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import ImageForm from '../components/forms/ImageForm';
import ImagesPageContent from '../components/imagesPage/ImagesPageContent';

export default function Images() {
  return (

    <div className="imagesparallax_wrapper">
      <div className="imagesparallax_group intro_screen" id="intro">
        <ImageForm />
      </div>

      <div className="imagesparallax_group" id="group-1">
        <div className="imagesparallax_layer base_layer">
          <div className="testCakeImage">
            <ImagesPageContent />
          </div>
        </div>
      </div>

    </div>

  );
}
