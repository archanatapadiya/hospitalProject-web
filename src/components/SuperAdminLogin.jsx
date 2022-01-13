import React, { useState } from "react";
import "./stylesLogin.css";
import PropTypes from "prop-types";
import Notification from "rc-notification";
import logo from "./images/logo.jpeg";
import { Link, useParams } from "react-router-dom";
import "./modal.css";
import Modal from "react-modal";
import Background from '../components/images/background.jpeg';
import logo1 from "./images/MyMedCordsTransparent.png";

async function loginAdmin(credentials) {
  return fetch("http://3.109.71.28/super_admin_login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export default function Login({ setToken, setSuperUser, setUserId }) {

  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    const token = await loginAdmin({
      username,
      password,
    });

    if (token.is_success) {
      setToken(token.data.token);
      setSuperUser(token.data.is_superuser);
      setUserId(token.data.user_id);
      localStorage.setItem("token", token.data.token);
      localStorage.setItem("patients", token.data.patients);
      localStorage.setItem("hosp_active", token.data.hospital_act);
      localStorage.setItem("hosp_disabled", token.data.hospital_des);
      localStorage.setItem("clinic_active", token.data.clinic_act);
      localStorage.setItem("clinic_disabled", token.data.clinic_des);
      localStorage.setItem("username", token.data.username);
      localStorage.setItem("isSuperuser", token.data.is_superuser);
      localStorage.setItem("user_id", token.data.user_id);
    }

    if (!token.is_success) {
      alert(token.response_message)
    }
  };

  return (
    <div
      className="login-wrapper"
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

      {/* <div style={{ padding: 20, border: "10px solid", borderRadius: 10 }}>
        <h1>
          {" "}
          <img src={logo} alt="Logo" width="40" /> MyMedCords
        </h1>
      </div> */}
      <br />
      <h2 style={{ color: '#D3ECF9' }}>Health Center Data Upload System</h2>


      <form
        onSubmit={handleAdminSubmit}
        style={{
          boxShadow: "0px 0px 10px #0000001a",
          backgroundColor: "white",
          width: "30%",
          border: "2px solid black",
          marginTop: "20px",
          padding: "20px",

        }}
      >
        <label>
          <p >Admin Username</p>
          <input
            type="text"
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </label>
        <label>
          <p style={{ marginTop: 20 }}>Admin Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <div>
          <br />
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
  setUserId: PropTypes.func.isRequired,
  setSuperUser: PropTypes.func.isRequired,
};
