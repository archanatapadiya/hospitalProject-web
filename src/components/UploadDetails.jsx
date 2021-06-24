import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import FormikMaterialTextField from "./FormikMaterialTextField";
import * as handlers from "./handlers";
import { Route, Switch, NavLink } from "react-router-dom";
import styles from "./styles.css";
import { Link, useParams } from 'react-router-dom';

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
import Modal from 'react-bootstrap/Modal';
import "bootstrap/dist/css/bootstrap.min.css";

function UploadData() {
  
  const { id } = useParams();
  const hospitalId = localStorage.getItem('hospital_id');

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  

  const admitUser = async() => {

    let isAdmit = false;
    if(!userData.is_admit){
      isAdmit = true;
    }
    let params = {
      user_id: id,
      hospital_id: hospitalId,
      is_admit: isAdmit,
      room_number: 201,
    }
    let success = await handlers.admitUser(params);

  }

  const [userData, setUserData] = useState([]);

  const patientName = userData?.first_name + ' ' + userData?.last_name;

  const fetchUserData = async (params) => {
    const userReports = await handlers.fetchUserDetails(params);
    let reportsData = userReports?.data;

    setUserData(reportsData);
    return reportsData;
  };

  useEffect(() => {
    let params = {
      user_id: id,
    };
    const userDetails = fetchUserData(params);
  }, []);
  
  return (
    <React.Fragment>
      <div className="account-profile-wrapper">

    
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
  
      <h2 style={{textDecoration: 'underline'}}>Patient Details</h2>
        <div style={{width: '30%', border: '2px solid grey', marginLeft: '35%', marginTop: '20px'}}>
          
          <p><span style={{fontWeight: 'bold'}}>Patient Name:</span> {patientName}</p>
          <p><span style={{fontWeight: 'bold'}}>Email:</span> {userData?.email}</p>
          <p><span style={{fontWeight: 'bold'}}>Address: </span>{userData?.address}</p>
          <p><span style={{fontWeight: 'bold'}}>Phone Number: </span>{userData?.phone_number}</p>
          {userData.is_admit && (
          <p><span style={{fontWeight: 'bold'}}>Room No.: </span>{userData?.room_number}</p>
          )}
        </div>


      <div style={styles.tabs}>
          <ul>
           
            <React.Fragment>
              <li>
                <button onClick={handleShow}>{userData?.is_admit ? 'Discharge Patient' : 'Admit Patient'}</button>
              </li>
            </React.Fragment>
          </ul>
        </div>
        
        <div style={styles.tabs}>
          <ul>
            <li>
              <NavLink to={`/fetch-user-reports/${id}`}>Fetch Reports</NavLink>
            </li>

            <React.Fragment>
              <li>
                <NavLink to={`/fetch-user-health/${id}`}>
                  Fetch Health Details
                </NavLink>
              </li>
            </React.Fragment>

            <React.Fragment>
              <li>
                <NavLink to={`/fetch-user-billing/${id}`}>Fetch Billings</NavLink>
              </li>
            </React.Fragment>
          </ul>
        </div>

        <div style={styles.tabs}>
          <ul>
            <li>
              <NavLink to={`/upload-user-reports/${id}`}>Upload Reports</NavLink>
            </li>

            <React.Fragment>
              <li>
                <NavLink to={`/upload-user-health/${id}`}>
                  Upload Health Details
                </NavLink>
              </li>
            </React.Fragment>

            <React.Fragment>
              <li>
                <NavLink to={`/upload-user-billing/${id}`}>Upload Billings</NavLink>
              </li>
            </React.Fragment>
          </ul>
        </div>

       
        <Switch>
          <Route path={`/fetch-user-reports/:id(\d*)`}>
            <FetchUserReports />
          </Route>

          <Route path={`/fetch-user-health/:id(\d*)`}>
            <FetchUserUpdates />
          </Route>

          <Route exact path={`/fetch-user-billing/:id(\d*)`}>
            <FetchUserBilling />
          </Route>

          <Route path={`/upload-user-reports/:id(\d*)`}>
            <UploadUserReports />
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
