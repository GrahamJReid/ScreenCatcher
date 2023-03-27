/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { getUserImages } from '../../API/imageData';
import ImageForm from '../../components/forms/ImageForm';
import ImagesPageContent from '../../components/imagesPage/ImagesPageContent';
import imagepagestyles from '../../styles/Images/ImagesPage.module.css';
import { useAuth } from '../../utils/context/authContext';

export default function Images() {
  const [updateImages, setUpdateImages] = useState([]);
  const { user } = useAuth();
  const handleUpdateArr = () => {
    getUserImages(user.uid).then((item) => {
      const sortedImageOrder = item.sort((b, a) => a.date_added.localeCompare(b.date_added));
      setUpdateImages(sortedImageOrder);
    });
  };
  useEffect(() => {
    handleUpdateArr();
  });
  return (

    <div className={imagepagestyles.ImagePageWrapper}>
      <div className={imagepagestyles.ImageFormContainer}>
        <ImageForm />
      </div>

      <div className={imagepagestyles.ImagesPageContentContainer}>
        <ImagesPageContent arr={updateImages} />
      </div>

    </div>

  );
}
