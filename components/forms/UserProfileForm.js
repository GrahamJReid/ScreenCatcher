/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getUserPublicImages } from '../../API/imageData';
import { getUser, updateUser } from '../../API/userData';
import { getUserThreads, updateThread } from '../../API/threadData';
import { getPostMessagesByUID, updatePostMessage } from '../../API/postMessageData';
import { getFollowUserObjectsByFollowedUserUid } from '../../API/followUserData';
import { getUserMessages, getUserSecondaryMessages, updateMessages } from '../../API/messagesData';
import userprofilepagestyles from '../../styles/users/UserProfilePage.module.css';
import { getCommentsByUID, updateComment } from '../../API/commentsData';

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

  const refresh = () => {
    window.location.reload(true);
  };

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
    getFollowUserObjectsByFollowedUserUid(user.uid)
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
          user_image: commentImageFormInput.comment_url,
          firebaseKey: item.firebaseKey,
          username: formInput.text,
        };

        updateThread(userThreadPayload);
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
    await getCommentsByUID(user.uid).then((threadArr) => {
      threadArr.forEach((item) => {
        const userThreadPayload = {
          author: formInput.text,
          firebaseKey: item.firebaseKey,
        };
        updateComment(userThreadPayload);
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
    refresh();
    // window.location.reload(true);
  };

  return (

    <>
      <div>
        <div className={userprofilepagestyles.Wrapper}>
          <div className={userprofilepagestyles.UserInfoDiv}>
            <h1 className={userprofilepagestyles.UserProfileName}>{userDetails.displayName}</h1>
            <h2> Followers:{numberOfFollowers} </h2>
            {userDetails.photoURL === '' ? <img className={userprofilepagestyles.UserProfileImage} src="/logo.png" /> : <img className={userprofilepagestyles.UserProfileImage} src={userDetails.photoURL} />}
          </div>
          <div>
            <Form className={userprofilepagestyles.ProfileFormDiv} onSubmit={handleSubmit}>
              {/* <h4 className={userprofilepagestyles.FormTitle}></h4> */}
              {commentImage === '' ? '' : <img className={userprofilepagestyles.ImagePreview} src={commentImage} width="20%" />}
              <FloatingLabel className={userprofilepagestyles.InputLabel} controlId="floatingSelect" label="Choose Profile Picture">
                <Form.Select
                  aria-label="Folder"
                  name="comment_url"
                  onChange={handleCommentImage}
                  value={commentImageFormInput.comment_url}
                  className={userprofilepagestyles.UserProfileFormInputSelect}
                  style={{ height: '2.5em' }}
                >
                  <option className={userprofilepagestyles.SelectText} value="">Change Profile Picture</option>
                  {userImages.map((folder) => (
                    <option
                      className={userprofilepagestyles.SelectText}
                      key={folder.firebaseKey}
                      value={folder.image_url}
                    >
                      {folder.image_title}
                    </option>
                  ))}
                </Form.Select>
              </FloatingLabel>
              <FloatingLabel className={userprofilepagestyles.InputLabel} controlId="floatingTextArea" label="Change UserName">
                <Form.Control
                  className={userprofilepagestyles.UserProfileFormInput}
                  type="textarea"
                  maxlength="15"
                  style={{ height: '2.5em' }}
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
