import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import history from "./lib/history";
import "./styles.css";
import { Row, Col } from "reactstrap";
import Background from '../components/images/background.jpeg';
import logo from "./images/MyMedCordsTransparent.png";
import axios from "axios";
import * as handlers from "./handlers";

function NameAndLogo() {
  const [localToken1, setLocalToken1] = useState("");
  const [hospName, setHospName] = useState("");

  const [reportCount, setReportCount] = useState(0);
  const [updatesCount, setUpdatesCount] = useState(0);
  const [billCount, setBillCount] = useState(0);


  const isSuperuser = localStorage.getItem("isSuperuser");

  const clickLogout = async (params) => {
    let url = "http://43.205.89.142/user_logout/";
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

  const fetchSpaceUtilization = async (hospital_id) => {
    let params = {
      hospital_id: parseInt(hospital_id),
    }
    const res = await handlers.fetchSpaceUtilization(params);

    if (res.is_success) {
      setReportCount(res?.data?.reports);
      setUpdatesCount(res?.data?.health_update);
      setBillCount(res?.data?.bill);
    }
  }

  useEffect(() => {
    const localTokenCalled = localStorage.getItem("token");
    const loggedInHospital = localStorage.getItem("hospital_name");
    const loggedInHospitalId = localStorage.getItem("hospital_id");

    if (localTokenCalled != null) {
      setLocalToken1(localTokenCalled);
    }
    if (loggedInHospital != null) {
      setHospName(loggedInHospital);
      const userReports = fetchSpaceUtilization(loggedInHospitalId);
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


      <span style={{ width: '100%', float: 'right', alignContent: 'flex-end', textAlign: 'right', textDecoration: 'underline' }}>
        {isSuperuser && (
          <Link onClick={clickDashboard} style={{ color: '#D3ECF9', marginRight: 20 }}>
            Dashboard
          </Link>
        )}
        <Link onClick={clickLogout} style={{ color: '#D3ECF9' }}>
          Logout
        </Link>

      </span>


      {!isSuperuser && (

        <span>  <hr
          style={{
            color: "white",
            backgroundColor: "white",
            height: 1,
            marginTop: 140
          }}
        /></span>
      )}

      {!isSuperuser && (
        <span style={{ width: '100%' }}>

          <span style={{ color: '#D3ECF9', textDecoration: 'underline', fontWeight: 'bold' }}>
            Space Utilization
          </span> <br />
          <span style={{ color: '#D3ECF9' }}>
            Reports: {reportCount} /5000
          </span>
          <span style={{ color: '#D3ECF9', marginLeft: 50 }}>
            Bills: {billCount} /5000
          </span>
          <span style={{ color: '#D3ECF9', marginLeft: 50 }}>
            Updates: {updatesCount} /5000
          </span>

        </span>
      )}

      {!isSuperuser && (

        <span>  <hr
          style={{
            color: "white",
            backgroundColor: "white",
            height: 1,
            marginTop: 10
          }}
        /></span>

      )}

    </div>
  );
}

export default NameAndLogo;
