import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import history from "./lib/history";
import "./styles.css";
import { Row } from "reactstrap";
import Background from '../components/images/background.jpeg';
import logo from "./images/MyMedCordsTransparent.png";
import axios from "axios";

function NameAndLogo() {
  const [localToken1, setLocalToken1] = useState("");
  const [hospName, setHospName] = useState("");

  const isSuperuser = localStorage.getItem("isSuperuser");

  const clickLogout = async (params) => {
    let url = "http://3.109.71.28/user_logout/";
    axios
      .get(url, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: localToken1,
        },
      })
      .then((res) => {
        localStorage.removeItem("token");
        localStorage.removeItem("is_superuser");
        localStorage.removeItem("isSuperuser");
        localStorage.removeItem("user_id");
        localStorage.removeItem("username");
        localStorage.removeItem("hospital_name");
        localStorage.removeItem("hospital_type");
        localStorage.removeItem("searched_user_data");
        localStorage.removeItem("user_data");
        localStorage.removeItem("hospital_id");
        isSuperuser ? history.push(`/superuser-login`) : history.push(`/`);
        window.location.reload();
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  const clickDashboard = async (params) => {
    history.push(`/superuser-login`);
    window.location.reload();
  };

  useEffect(() => {
    const localTokenCalled = localStorage.getItem("token");
    const loggedInHospital = localStorage.getItem("hospital_name");

    if (localTokenCalled != null) {
      setLocalToken1(localTokenCalled);
    }
    if (loggedInHospital != null) {
      setHospName(loggedInHospital);
    }
    if (localTokenCalled == null) {
      window.location.reload();
    }
  }, [localToken1]);


  return (
    <div style={{ width: '100%' }}>

      <Row style={{ width: '100%' }}>

        <span
          style={{
            fontSize: 50, fontWeight: 'bold', alignContent: 'flex-start', float: 'left', color: '#D3ECF9'
          }}>  {isSuperuser ? 'Admin' : hospName} </span>
        <span style={{ float: 'right' }}>
          {" "}
          <img src={logo} alt="Logo" width="100" />  <br /><span style={{ fontWeight: 'bold' }}>{isSuperuser ? 'SUPERUSER' : 'MYMEDCORDS'}</span>

        </span>

      </Row>

      <span style={{ width: '100%', float: 'right', alignContent: 'flex-end', textAlign: 'right', marginTop: 10, textDecoration: 'underline' }}>
        {isSuperuser && (
          <Link onClick={clickDashboard} style={{ color: '#D3ECF9', marginRight: 20 }}>
            Dashboard
          </Link>
        )}
        <Link onClick={clickLogout} style={{ color: '#D3ECF9' }}>
          Logout
        </Link>

      </span>
      <span>  <hr
        style={{
          color: "white",
          backgroundColor: "white",
          height: 1,
          marginTop: 140
        }}
      /></span>


    </div>
  );
}

export default NameAndLogo;
