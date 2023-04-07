/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getUserImages } from '../../API/imageData';
import imagepagestyles from '../../styles/Images/ImagesPage.module.css';
import { useAuth } from '../../utils/context/authContext';

export default function ImagesPageContent({ arr }) {
  const getFilteredItems = (query, columnArray1) => {
    if (!query) {
      return columnArray1;
    }
    return columnArray1.filter((image) => image.image_title.toLowerCase().includes(query.toLowerCase()) || image.category.toLowerCase().includes(query.toLowerCase()) || image.date_added.includes(query.toLowerCase()) || image.description.toLowerCase().includes(query.toLowerCase()));
  };
  const getFilteredItems2 = (query, columnArray2) => {
    if (!query) {
      return columnArray2;
    }
    return columnArray2.filter((image) => image.image_title.toLowerCase().includes(query.toLowerCase()) || image.category.toLowerCase().includes(query.toLowerCase()) || image.date_added.includes(query.toLowerCase()) || image.description.toLowerCase().includes(query.toLowerCase()));
  };

  const { user } = useAuth();
  const [order, setOrder] = useState([]);
  const [query, setQuery] = useState('');
  const pushedArray1 = [];
  const pushedArray2 = [];
  const [columnArray1, setColumnArray1] = useState([]);
  const [columnArray2, setColumnArray2] = useState([]);
  const filteredItems1 = getFilteredItems(query, columnArray1);
  const filteredItems2 = getFilteredItems(query, columnArray2);

  useEffect(() => {
    getUserImages(user.uid).then((item) => {
      const sortedImageOrder = item.sort((a, b) => b.sort_date - (a.sort_date));
      setOrder(sortedImageOrder);
      for (let i = 0; i < sortedImageOrder.length; i += 2) {
        pushedArray1.push(sortedImageOrder[i]);
      }
      for (let i = 1; i < sortedImageOrder.length; i += 2) {
        pushedArray2.push(sortedImageOrder[i]);
      }
      setColumnArray1(pushedArray1);
      setColumnArray2(pushedArray2);
    });
  }, [user.uid, arr]);

  return (
    <>
      <Head>
        <title>Images</title>
      </Head>
      <div className={imagepagestyles.SearchBarDiv}>
        <input className={imagepagestyles.SearchBar} type="text" placeholder="Search Images By Title or Category" onChange={(e) => setQuery(e.target.value)} />
      </div>
      <div className={imagepagestyles.ContainImagePageContent}>
        <div className={imagepagestyles.ContainImagePageContentColumn}>
          {filteredItems1.map((image) => (
            <Link key={image.firebaseKey} passHref href={`/viewImage/${image.firebaseKey}`}>
              <img src={`${image.image_url}`} height="50%" width="50%" className={imagepagestyles.ImagesPageImage} />
            </Link>
          ))}
        </div>
        <div className={imagepagestyles.ContainImagePageContentColumn}>
          {filteredItems2.map((image) => (
            <Link key={image.firebaseKey} passHref href={`/viewImage/${image.firebaseKey}`}>
              <img src={`${image.image_url}`} height="50%" width="50%" className={imagepagestyles.ImagesPageImage} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

ImagesPageContent.propTypes = {
  arr: PropTypes.arrayOf(PropTypes.shape({
    firebaseKey: PropTypes.string,
    image_title: PropTypes.string,
    date_added: PropTypes.string,
    description: PropTypes.string,
    uid: PropTypes.string,
    public: PropTypes.bool,
    username: PropTypes.string,
    gallery: PropTypes.bool,
    category: PropTypes.string,
    image_file: PropTypes.string,
  })).isRequired,
};
