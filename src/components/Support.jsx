import React, { useState, useEffect } from "react";

import _ from "lodash";
import Background from '../components/images/background.jpeg';
import logo1 from "./images/MyMedCordsTransparent.png";


function Support() {


  return (
    <div       className="login-wrapper"
    style={{
      boxShadow: "0px 0px 10px #0000001a",
      border: "1px solid #c9c9c9",
      padding: 50,
      marginLeft: 200,
      marginRight: 200,
      marginTop: 50,
      backgroundColor: "#F7FBF9",
      opacity: 1,
      background: `url(${Background})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    }}
  >
    <br />

    <img src={logo1} alt="Logo" width="100" />  <br /><span style={{ fontWeight: 'bold', marginTop: -20, }}>MYMEDCORDS</span>

    <br />
    <h2 style={{ color: '#D3ECF9' }}>Health Center Data Upload System</h2>
    <br />
    <br />

     <h3 style={{ color: '#D3ECF9' }}>MyMedCords is a platform that provides the ability to store all of your hospital details at one place.</h3>
     <h3 style={{ color: '#D3ECF9' }}>MyMedCords provides you the ability to classify your reports, health updates given by the doctor and your bills in different tabs</h3>
     <h3 style={{ color: '#D3ECF9' }}>A patient can access all of his hospital documents very significantly from the app</h3>

     <br />
    <br />
    
<h2 style={{ color: '#D3ECF9', fontWeight: 'bold', textDecoration: 'underline' }}>For any further queries you can reach us at-</h2>
<h3 style={{ color: '#D3ECF9' }}>Mobile Number: 9970785525</h3>
<h3 style={{ color: '#D3ECF9' }}>Email: manavverma@gmail.com</h3>
<h3 style={{ color: '#D3ECF9' }}>Address: 759/4 Deccan Gymkhana
Above Post Office,
Pune 411004</h3>
    </div>
  );
}

export default Support;
