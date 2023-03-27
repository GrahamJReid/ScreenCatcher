/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import FoldersPageContent from '../../components/foldersPage/FoldersPageContent';
import FolderForm from '../../components/forms/FolderForm';
import folderspagestyles from '../../styles/Folders/FoldersPage.module.css';

export default function Folders() {
  return (
    <>

      <div className="foldersparallax_wrapper">

        <div className="foldersparallax_group" id="group-1">
          <div className="foldersparallax_layer base_layer">
            <FolderForm />
          </div>
        </div>

        <div className="foldersparallax_group outro_screen" id="outro">
          <div className={folderspagestyles.FoldersPageContentContainer}>
            <FoldersPageContent />
          </div>
        </div>
      </div>
    </>
  );
}
