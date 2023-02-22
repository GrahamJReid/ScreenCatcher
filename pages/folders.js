/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import FoldersPageHero from '../components/foldersPage/FolderPageHero';
import FoldersPageContent from '../components/foldersPage/FoldersPageContent';

export default function Images() {
  return (
    <>
      <div className="images-div-container">
        <FoldersPageHero />
        <FoldersPageContent />
      </div>
    </>
  );
}
