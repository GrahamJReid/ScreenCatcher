/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getUserGalleryImages } from '../../API/imageData';

export default function GalleryCarousel() {
  const [images, setImages] = useState([]);
  const { user } = useAuth();

  const getGalleryImages = () => {
    getUserGalleryImages(user.uid).then(setImages);
  };

  useEffect(() => {
    getGalleryImages();
  }, [user]);

  return (

    <Carousel interval={null} className="gallery-carousel-container">
      {images.map((image) => (
        <Carousel.Item key={image.firebaseKey}>
          <img src={`${image.image_url}`} className="carousel-image" />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
