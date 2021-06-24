import React, { useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";


const TopbarNavMenu = (props) => {

    const user_id  = props.userId;

    console.log('ididid', props.userId)
    let loc = window.location.href;

  return (
    <div className="topbar" style={{backgroundColor: '#E1E3E2', marginLeft: '30%', marginRight: '30%'}}>
         {(loc.includes('upload-details') || 
         loc.includes('upload-user-billing') ||
         loc.includes('fetch-user-billing') ||
         loc.includes('upload-user-health') ||
         loc.includes('fetch-user-health') ||
         loc.includes('upload-user-reports') ||
         loc.includes('fetch-user-reports') )
         && (
      <ul className="nav" style={{ display: "flex", flexDirection: "row", listStyleType: "none" }}>
         
        <li style={{marginLeft: '0px'}}>
          <Link className="topbar__link" to="/">
            Search Patient
          </Link>
        </li>
        
        <li style={{marginLeft: '-40%'}}>
          <Link className="topbar__link" to={`/upload-details/${user_id}`}>
            Patient Details
          </Link>
        </li>
      
        
      </ul>
      )}
    </div>
  );
};

export default TopbarNavMenu;
