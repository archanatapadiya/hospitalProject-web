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

function UploadData() {

  
  const { id } = useParams();

  
  return (
    <React.Fragment>
      <div className="account-profile-wrapper">

      <div style={styles.tabs}>
          <ul>
           
            <React.Fragment>
              <li>
                <NavLink to={`/admit-user`}>Admit User</NavLink>
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
