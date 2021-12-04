import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import FormikMaterialTextField from "./FormikMaterialTextField";
import * as handlers from "./handlers";
import { Route, Switch, NavLink } from "react-router-dom";
import styles from "./styles.css";
import { Link, useParams } from "react-router-dom";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import {
  Col,
  Container,
  Row,
  Card,
  CardBody,
  ButtonToolbar,
  Button,
} from "reactstrap";
// import { uploadUserReports } from "./utils/api";
import FetchUserReports from "./FetchUserReports";
import FetchUserUpdates from "./FetchUserUpdates";
import FetchUserBilling from "./FetchUserBilling";
import UploadUserReports from "./UploadUserReports";
import UploadUserUpdates from "./UploadUserUpdates";
import UploadUserBilling from "./UploadUserBilling";
import { useLocation } from "react-router-dom"

import notifications from "./notifications";
import { setSourceMapRange } from "typescript";

function UploadData() {
  const location = useLocation()
  const { id } = useParams();

  if(location?.query?.hosp_id?.hospital_id){
    localStorage.setItem("hospital_id", location?.query?.hosp_id?.hospital_id);
  }
  const hospitalId = localStorage.getItem("hospital_id") || location.query.hosp_id.hospital_id;
  localStorage.setItem("hospital_id", hospitalId);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [radioValue, setRadioValue] = React.useState("opd");

  const handleChange = (event) => {
    setRadioValue(event.target.value);
  };

  const admitUser = async () => {
    let isAdmit = false;
    if (!userData.is_admit) {
      isAdmit = true;
    }

    let roomNumber;
    if(!userData.is_admit){
      roomNumber = textInput.current.value
    } 
    else{
      roomNumber = userData.room_number;
    }

    let params = {
      user_id: id,
      hospital_id: hospitalId,
      is_admit: isAdmit,
      room_number: roomNumber,
    };
    let success = await handlers.admitUser(params);

    notifications.show({
      type: "info",
      message: "Saving Personal Details...",
      key: "req-form",
    });
  };

  const [userData, setUserData] = useState([]);
  const [sure1, setSure1] = useState(false);

  let hospital_type = localStorage.getItem("hospital_type");

  const patientName = userData?.first_name + " " + userData?.last_name;

  const fetchUserData = async (params) => {
    const userReports = await handlers.fetchUserDetails(params);
    let reportsData = userReports?.data;

    setUserData(reportsData);
    return reportsData;
  };

  useEffect(() => {
    if (!localStorage.getItem('reload')) {
      localStorage['reload'] = true;
      window.location.reload();
  } else {
      localStorage.removeItem('reload');
  }
  }, []);

  useEffect(() => {
    
    let params = {
      user_id: id,
    };
    const userDetails = fetchUserData(params);
  }, []);

  let textInput = React.createRef();

  return (
    <React.Fragment>
      <div
        className="login-wrapper"
        style={{
          boxShadow: "0px 0px 10px #0000001a",
          border: "1px solid #c9c9c9",
          padding: 50,
          marginLeft: 300,
          marginRight: 300,
          marginTop: 50,
          backgroundColor: "#F7FBF9",
          opacity: 1,
        }}
      >
        <h2 style={{ textDecoration: "underline" }}>Patient Details</h2>
        <div
          style={{
            // width: "30%",
            padding: 20,
            border: "2px solid grey",
            // marginLeft: "35%",
            marginTop: "20px",
            backgroundColor: "white",
          }}
        >
          <p>
            <span style={{ fontWeight: "bold" }}>Patient Name:</span>{" "}
            {patientName}
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>Email:</span> {userData?.email}
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>Address: </span>
            {userData?.address}
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>Phone Number: </span>
            {userData?.phone_number}
          </p>
          {userData.is_admit && (
            <p>
              <span style={{ fontWeight: "bold" }}>Room No.: </span>
              {userData?.room_number}
            </p>
          )}
        </div>

        <br />
     

        {(hospital_type == 2 || (hospital_type == 3 )) &&
          !userData.is_admit && (
            <div className="col" style={{ marginBottom: -10 }}>
              <h3
                className="form-group-label"
                style={{ fontSize: 14, marginTop: 10 }}
              >
                Enter Room Number
              </h3>
              <p>
                <input
                  ref={textInput}
                  type="room_number"
                  id="room_number"
                  required
                />
              </p>
            </div>
          )}

        {(hospital_type == 2 ||
          (hospital_type == 3 )) && (
          <div>
            <React.Fragment>
              <br />
              {userData?.is_admit && (
                <button
                  class="btn btn-success btn-sm"
                  onClick={() => setSure1(true)}
                >
                  Discharge Patient
                </button>
              )}

              {!userData?.is_admit && (
                <button class="btn btn-success btn-sm" onClick={admitUser}>
                  Admit Patient
                </button>
              )}

              {sure1 && (
                <Link
                  className="topbar__link"
                  style={{ marginLeft: 15 }}
                  onClick={admitUser}
                >
                  Sure?
                </Link>
              )}
            </React.Fragment>
          </div>
        )}

        <br />

        <div>
          <ul>
            <li>
              <NavLink to={`/fetch-user-reports/${id}`}>Fetch Reports</NavLink>
            </li>

            <li>
              <NavLink to={`/fetch-user-health/${id}`}>
                Fetch Health Details
              </NavLink>
            </li>

            <li>
              <NavLink to={`/fetch-user-billing/${id}`}>Fetch Billings</NavLink>
            </li>
          </ul>
        </div>

        <div>
          <ul>
            <li>
                <NavLink to={`/upload-user-reports/${id}`}>
                  Upload Reports
                </NavLink>
            </li>

            <li>
              <NavLink to={`/upload-user-health/${id}`}>
                Upload Health Details
              </NavLink>
            </li>

            <li>
              <NavLink to={`/upload-user-billing/${id}`}>
                Upload Billings
              </NavLink>
            </li>
          </ul>
        </div>

        <Switch>
          <Route path={`/fetch-user-reports/:id(\d*)`}>
            <FetchUserReports hospitalType={hospital_type} />
          </Route>

          <Route path={`/fetch-user-health/:id(\d*)`}>
            <FetchUserUpdates />
          </Route>

          <Route exact path={`/fetch-user-billing/:id(\d*)`}>
            <FetchUserBilling />
          </Route>

          <Route path={`/upload-user-reports/:id(\d*)`}>
            <UploadUserReports hospitalType={hospital_type}/>
          </Route>

          <Route path={`/upload-user-health/:id(\d*)`}>
            <UploadUserUpdates />
          </Route>

          <Route exact path={`/upload-user-billing/:id(\d*)`}>
            <UploadUserBilling />
          </Route>

          <Route exact path={`/admit-user`}>
            <UploadUserBilling />
          </Route>
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default UploadData;
