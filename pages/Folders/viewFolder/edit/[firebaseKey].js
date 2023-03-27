import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleFolder } from '../../../../API/folderData';
import FolderForm from '../../../../components/forms/FolderForm';

export default function EditFolder() {
  const [folder, setFolder] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleFolder(firebaseKey).then(setFolder);
  }, [firebaseKey]);
  return (
    <FolderForm obj={folder} />
  );
}
