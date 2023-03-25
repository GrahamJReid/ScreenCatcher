/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getUserPublicImages } from '../../API/imageData';
import { getUser, updateUser } from '../../API/userData';
import { getUserThreads, updateThread } from '../../API/threadData';
import { getPostMessagesByUID, updatePostMessage } from '../../API/postMessageData';
import { getFollowUserObjectsByCurrentUserUid } from '../../API/followUserData';
import { getUserMessages, getUserSecondaryMessages, updateMessages } from '../../API/messagesData';
import userprofilepagestyles from '../../styles/users/UserProfilePage.module.css';

const commentImageInitialState = {
  comment_url: '',
};
const initialState = {
  firebaseKey: '',
  uid: '',
  text: '',
  thread_id: '',
  date_added: '',
  author: '',
};

export default function UserProfileForm() {
  const { user } = useAuth();
  const [formInput, setFormInput] = useState(initialState);
  const [userImages, setUserImages] = useState([]);
  const [pageReload, setPageReload] = useState(0);
  const [userDetails, setUserDetails] = useState([]);
  const [commentImage, setCommentImage] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [numberOfFollowers, setNumberOfFollowers] = useState(0);
  const [commentImageFormInput, setCommentImageFormInput] = useState(commentImageInitialState);

  useEffect(() => {
    getUserPublicImages(user.uid).then(setUserImages);
  }, [user]);
  useEffect(() => {
    getUser(user.uid).then(setUserDetails);
  }, [user, pageReload]);
  useEffect(() => {
    const userObj = {
      text: `${user.displayName}`,
    };
    setFormInput(userObj);
  }, [user]);
  useEffect(() => {
    const userObj = {
      comment_url: `${user.photoURL}`,
    };
    setCommentImageFormInput(userObj);
  }, [user]);
  useEffect(() => {
    getFollowUserObjectsByCurrentUserUid(user.uid)
      .then((arr) => setNumberOfFollowers(arr.length));
  }, [user]);

  const handleCommentImage = (e) => {
    const { name, value } = e.target;
    setCommentImage(value);
    setCommentImageFormInput(name);
    setCommentImageFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      photoURL: commentImageFormInput.comment_url,
      firebaseKey: userDetails.firebaseKey,
      displayName: formInput.text,
    };
    getUser(user.uid).then(updateUser(payload));
    setCommentImage('');
    await getUserThreads(user.uid).then((threadArr) => {
      threadArr.forEach((item) => {
        const userThreadPayload = {
          user_image: commentImage,
          firebaseKey: item.firebaseKey,
          username: formInput.text,
        };

        updateThread(userThreadPayload).then((itemzzz) => console.warn(itemzzz));
      });
    });
    await getPostMessagesByUID(user.uid).then((threadArr) => {
      threadArr.forEach((item) => {
        const userPostMessagePayload = {
          author: formInput.text,
          firebaseKey: item.firebaseKey,
        };

        updatePostMessage(userPostMessagePayload);
      });
    });
    await getUserMessages(user.uid).then((threadArr) => {
      threadArr.forEach((item) => {
        const userThreadPayload = {
          user_1name: formInput.text,
          firebaseKey: item.firebaseKey,
        };

        updateMessages(userThreadPayload);
      });
    });
    await getUserSecondaryMessages(user.uid).then((threadArr) => {
      threadArr.forEach((item) => {
        const userThreadPayload = {
          user_2name: formInput.text,
          firebaseKey: item.firebaseKey,
        };

        updateMessages(userThreadPayload);
      });
    });
    setPageReload(1);
    window.location.reload(true);
  };

  return (

    <>
      <div>
        <div className={userprofilepagestyles.Wrapper}>
          <div className={userprofilepagestyles.UserInfoDiv}>
            <h1>{userDetails.displayName}</h1>
            <img className={userprofilepagestyles.UserProfileImage} src={userDetails.photoURL} />

          </div>
          <div>
            <Form onSubmit={handleSubmit}>
              <h4 className="mt-3 mb-3">Edit User Profile</h4>
              {commentImage === '' ? '' : <img src={commentImage} width="200px" />}
              <FloatingLabel controlId="floatingSelect">
                <Form.Select
                  aria-label="Folder"
                  name="comment_url"
                  onChange={handleCommentImage}
                  value={commentImageFormInput.comment_url}
                  className={userprofilepagestyles.UserProfileFormInput}
                >
                  <option value="">Change Profile Picture</option>
                  {userImages.map((folder) => (
                    <option
                      key={folder.firebaseKey}
                      value={folder.image_url}
                    >
                      {folder.image_title}
                    </option>
                  ))}
                </Form.Select>
              </FloatingLabel>
              <FloatingLabel controlId="floatingTextArea" label="Change UserName">
                <Form.Control
                  className={userprofilepagestyles.UserProfileFormInput}
                  type="textarea"
                  style={{ height: '100px' }}
                  name="text"
                  value={formInput.text}
                  onChange={handleChange}
                  required
                />
              </FloatingLabel>
              <Button type="submit" className={userprofilepagestyles.UserProfileFormSubmitButton}>Submit Changes</Button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
