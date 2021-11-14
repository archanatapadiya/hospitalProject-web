import React, { useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import axios from 'axios';
import history from '../lib/history';

const TopbarNavMenu = (props) => {

  const user_id = props.userId;

  let loc = window.location.href;
  const localToken = localStorage.getItem('token');

  const clickLogout = async (params) => {
    let url = 'http://3.110.35.199/user_logout/';
    axios.get(url, {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: localToken,
      }
    })
      .then(res => {
        localStorage.removeItem('isSuperuser');
        localStorage.removeItem('username');
        localStorage.removeItem('token');

        history.push(`/`);
        window.location.reload();
        console.log(res.data);
      })
      .catch(err => console.log(err))
  };

  return (
    <div className="topbar" style={{ backgroundColor: '#E1E3E2', paddingLeft: '20%', paddingRight: '20%' }}>

      <ul className="nav" style={{ display: "flex", flexDirection: "row", listStyleType: "none" }}>

        {(loc.includes('upload-details') ||
          loc.includes('upload-user-billing') ||
          loc.includes('fetch-user-billing') ||
          loc.includes('upload-user-health') ||
          loc.includes('fetch-user-health') ||
          loc.includes('upload-user-reports') ||
          loc.includes('add-new-user') ||
          loc.includes('fetch-user-reports'))
          && (
            <li >
              <Link className="topbar__link" to="/">
                Search Patient
              </Link>
            </li>
          )}
        {(loc.includes('upload-details') ||
          loc.includes('upload-user-billing') ||
          loc.includes('fetch-user-billing') ||
          loc.includes('upload-user-health') ||
          loc.includes('fetch-user-health') ||
          loc.includes('upload-user-reports') ||
          loc.includes('add-new-user') ||
          loc.includes('fetch-user-reports'))
          && (
            <li >
              <Link className="topbar__link" to={`/upload-details/${user_id}`}>
                Patient Details
              </Link>
            </li>
          )}

        <li >
          <Link className="topbar__link" onClick={clickLogout}>
            Logout
          </Link>
        </li>

      </ul>

    </div>
  );
};

export default TopbarNavMenu;
