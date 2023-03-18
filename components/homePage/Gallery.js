/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getUserGalleryImages } from '../../API/imageData';

export default function UserActivityCarousel() {
  const [images, setImages] = useState([]);
  const { user } = useAuth();

  const getActivities = () => {
    getUserGalleryImages(user.uid).then(setImages);
  };

  useEffect(() => {
    getActivities();
  }, [user]);

  return (
    <Carousel interval={null}>
      {images.map((image) => (
        <Carousel.Item className="activityCarouselItem">
          <img src={`${image.image_url}`} height="50%" width="50%" />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
