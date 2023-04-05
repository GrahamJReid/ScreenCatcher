/* eslint-disable no-trailing-spaces */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

function OffCanvas({ name, ...props }) {
  const [show, setShow] = useState(false);
  const { user } = useAuth();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const router = useRouter();

  return (
    <>
      <Button variant="dark" onClick={handleShow} className="off-canvas-show-button">
        <div className="off-canvas-show-button-div">
          <div>_____</div>
          <div>_____</div>
          <div>_____</div>
        </div>
      </Button>
      <Offcanvas show={show} onHide={handleClose} {...props} className="off-canvas-container">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="OffCanvas-title">ScreenCatcher</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>

          {user.photoURL === '' ? <img src="/logo.png" width="315px" /> : <img src={user.photoURL} width="200px" className="OffCanvas-user-image" />} 
          <h1 className="OffCanvas-username">{user.displayName}</h1>

          <nav onClick={handleClose}>
            <ul className="navbar-nav me-auto">
              <div className="NavLinkList">
                <li className="NavLink">
                  <Link passHref href="/">
                    <a className="NavLink">
                      Home
                    </a>
                  </Link>
                </li>

                <li className="NavLink">
                  <Link passHref href="/ImageEditorPage">
                    <a className="NavLink">
                      Image Editor
                    </a>
                  </Link>
                </li>

                <li className="NavLink">
                  <Link passHref href="/Images/images">
                    <a className="NavLink">
                      Images
                    </a>
                  </Link>
                </li>

                <li className="NavLink">
                  <Link passHref href="/Folders/foldersPage">

                    <a className="NavLink">
                      Folders
                    </a>
                  </Link>
                </li>

                <li className="NavLink">
                  <Link passHref href="/threads/ThreadsPage">

                    <a className="NavLink">
                      Threads
                    </a>
                  </Link>
                </li>

                <li className="NavLink">
                  <Link passHref href="/Messages/messagesPage">

                    <a className="NavLink">
                      Messages
                    </a>
                  </Link>
                </li>

                <li className="NavLink">
                  <Link passHref href="/Users/UsersPage">

                    <a className="NavLink">
                      Users
                    </a>
                  </Link>
                </li>

                <li className="NavLink">
                  <Link passHref href="/userProfile">

                    <a className="NavLink">
                      UserProfile
                    </a>
                  </Link>
                </li>
              </div>
              <button
                type="button"
                className="btn navbar-signout-btn SignOutButton"
                onClick={() => {
                  router.push('/');
                  signOut();
                }}
              >
                Sign Out
              </button>
            </ul>
          </nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default OffCanvas;

OffCanvas.propTypes = {

  name: PropTypes.string.isRequired,

};
