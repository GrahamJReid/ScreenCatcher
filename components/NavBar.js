/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-md">
      <div className="container-fluid">

        <Link passHref href="/">
          <a className="navbar-title" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01">
            ScreenCatcher
          </a>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="NavLinkList">
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <ul className="navbar-nav me-auto">
              <li className="NavLink">
                <Link passHref href="/">
                  <a className="NavLink">
                    Home
                  </a>
                </Link>
              </li>
              <li className="NavLink">
                <Link passHref href="/images">
                  <a className="NavLink">
                    Images
                  </a>
                </Link>
              </li>
              <li className="NavLink">
                <Link passHref href="/folders">

                  <a className="NavLink">
                    Folders
                  </a>
                </Link>
              </li>
              <li className="NavLink">
                <Link passHref href="/ImageEditorPage">

                  <a className="NavLink">
                    ImageEditor
                  </a>
                </Link>
              </li>
              <li className="NavLink">
                <Link passHref href="/UsersPage">

                  <a className="NavLink">
                    Users
                  </a>
                </Link>
              </li>
              <button type="button" className="btn btn-danger navbar-signout-btn" onClick={signOut}>
                Sign Out
              </button>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
