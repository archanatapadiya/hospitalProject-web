import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import FormikMaterialTextField from "./FormikMaterialTextField";
import * as handlers from "./handlers";
import { Route, Switch, NavLink } from 'react-router-dom';
import styles from './styles.css';
import {
  Col,
  Container,
  Row,
  Card,
  CardBody,
  ButtonToolbar,
  Button,
} from "reactstrap";
import { uploadUserReports } from "./utils/api";
import FetchUserReports from './FetchUserReports';

function UploadData() {
  let id = 9;
  return (
    // <div>
    //   <h2 style={{ textDecoration: "underline" }}>Upload details for user</h2>
    //   <br />

    //   <div>
    //     <a href="/upload-user-reports">Upload Reports</a>
    //   </div>

    //   <br />

    //   <div>
    //     <a href="/upload-user-health">Upload Health Details</a>
    //   </div>
    //   <br />
    //   <div>
    //     <a href="/upload-user-billing">Upload Billings</a>
    //   </div>
    // </div>

    <React.Fragment>
      <div className="account-profile-wrapper">
        <div style={styles.tabs} >
          <ul>
           
            <li>
              <NavLink to={`/fetch-user-reports`}>Fetch Reports</NavLink>
            </li>

            <li>
              <NavLink to={`/upload-user-reports`}>Upload Reports</NavLink>
            </li>
          
              <React.Fragment>
                <li>
                  <NavLink to={`/upload-user-health`}>Upload Health Details</NavLink>
                </li>
              </React.Fragment>
          
           
              <React.Fragment>
                <li>
                  <NavLink to={`/upload-user-billing`}>Upload Billings</NavLink>
                </li>
              </React.Fragment>
          
          </ul>
        </div>
        <Switch>
          <Route path={`/fetch-user-reports`}>
            <FetchUserReports id={id} />
          </Route>

          <Route path={`/upload-user-health`}>
            <FetchUserReports id={id} />
          </Route>

        
          <Route exact path={`/upload-user-billing`}>
            <FetchUserReports id={id} />
          </Route>
        </Switch>
      </div>
    </React.Fragment>

  );
}

export default UploadData;
