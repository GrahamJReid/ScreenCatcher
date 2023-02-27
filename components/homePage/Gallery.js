/* eslint-disable no-return-assign */
/* eslint-disable no-self-compare */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from 'react';
import { getUserGalleryImages } from '../../API/imageData';
import { useAuth } from '../../utils/context/authContext';

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [current, setCurrent] = useState(0);
  const [currentLength, setCurrentLength] = useState(0);
  const { length } = images.length;
  const { user } = useAuth();

  useEffect(() => {
    getUserGalleryImages(user.uid).then(setImages);
    setCurrentLength(images.length);
  }, [images.length, length, user.uid]);

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
    console.warn(currentLength);
  };
  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
    console.warn(currentLength);
  };
  if (!Array.isArray(images) || images.length <= 0) {
    return <h1>Add Images To Your Gallery</h1>;
  }

  return (
    <div id="gallery" className="gallery-div-container">
      <div className="gallery-container">
        <h1 className="gallery-title">Gallery</h1>
        {currentLength
          ? (<button type="button" label="prev" onClick={prevSlide} className="gallery-button-l">Prev</button>

          ) : ''}
        {currentLength
          ? (<button type="button" label="next" onClick={nextSlide} className="gallery-button-r">NEXT</button>

          ) : ''}
        {images.map((item, index) => (
          <div key={index} className={index === current ? 'gallery-current' : 'gallery-none'}>
            <div className="gallery-content-container">

              {index === current && (<img src={`${item.image_url}`} alt="userUpload" className="gallery-image" />)}

            </div>
          </div>

        ))}

      </div>

    </div>
  );
}
