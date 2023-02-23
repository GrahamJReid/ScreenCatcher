/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import ImageForm from '../components/forms/ImageForm';

export default function Folders() {
  return (
    <>

      <div className="foldersparallax_wrapper">

        <div className="foldersparallax_group" id="group-1">
          <div className="foldersparallax_layer base_layer">
            <ImageForm />
          </div>
        </div>

        <div className="foldersparallax_group outro_screen" id="outro">
          outro screen
        </div>
      </div>
    </>
  );
}
