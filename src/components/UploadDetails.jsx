import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import FormikMaterialTextField from "./FormikMaterialTextField";
import * as handlers from "./handlers";
import { Route, Switch, NavLink } from "react-router-dom";
import styles from "./styles.css";
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
import FetchUserReports from "./FetchUserReports";
import FetchUserUpdates from "./FetchUserUpdates";
import FetchUserBilling from "./FetchUserBilling";
import UploadUserReports from "./UploadUserReports";
import UploadUserUpdates from "./UploadUserUpdates";
import UploadUserBilling from "./UploadUserBilling";

function UploadData() {
  let id = 9;
  return (
    <React.Fragment>
      <div className="account-profile-wrapper">
        <div style={styles.tabs}>
          <ul>
            <li>
              <NavLink to={`/fetch-user-reports`}>Fetch Reports</NavLink>
            </li>

            <React.Fragment>
              <li>
                <NavLink to={`/fetch-user-health`}>
                  Fetch Health Details
                </NavLink>
              </li>
            </React.Fragment>

            <React.Fragment>
              <li>
                <NavLink to={`/fetch-user-billing`}>Fetch Billings</NavLink>
              </li>
            </React.Fragment>
          </ul>
        </div>

        <div style={styles.tabs}>
          <ul>
            <li>
              <NavLink to={`/upload-user-reports`}>Upload Reports</NavLink>
            </li>

            <React.Fragment>
              <li>
                <NavLink to={`/upload-user-health`}>
                  Upload Health Details
                </NavLink>
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
            <FetchUserReports />
          </Route>

          <Route path={`/fetch-user-health`}>
            <FetchUserUpdates />
          </Route>

          <Route exact path={`/fetch-user-billing`}>
            <FetchUserBilling />
          </Route>

          <Route path={`/upload-user-reports`}>
            <UploadUserReports />
          </Route>

          <Route path={`/upload-user-health`}>
            <UploadUserUpdates />
          </Route>

          <Route exact path={`/upload-user-billing`}>
            <UploadUserBilling />
          </Route>
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default UploadData;
