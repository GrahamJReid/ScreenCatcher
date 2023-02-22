/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styles from '../styles/ImagesPage.module.css';
import { useAuth } from '../utils/context/authContext';

export default function Images() {
  const { user } = useAuth();
  return (
    <div id="home" className={styles.HeroDivContainer}>
      {/* overlay */}
      <div className="hero-overlay" />
      <div className="hero-content-container">
        <img src={user.photoURL} height="200" width="200" />
        <h2 className="hero-heading">{user.displayName}</h2>
        <p className="hero-message"> Start Catching Images</p>
      </div>

    </div>
  );
}
