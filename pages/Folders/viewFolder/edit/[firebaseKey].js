import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleFolder } from '../../../../API/folderData';
import FolderForm from '../../../../components/forms/FolderForm';
import editfolderpagestyles from '../../../../styles/Folders/EditFolderPage.module.css';

export default function EditFolder() {
  const [folder, setFolder] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleFolder(firebaseKey).then(setFolder);
  }, [firebaseKey]);
  return (
    <div className={editfolderpagestyles.EditFolderFormDiv}>
      <FolderForm obj={folder} />
    </div>
  );
}
