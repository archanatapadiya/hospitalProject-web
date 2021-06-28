import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import FormikMaterialTextField from "./FormikMaterialTextField";
import * as handlers from "./handlers";
import UploadDocument from "./UploadDocument";
import Table from "react-bootstrap/Table";
import _ from "lodash";
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

const renderTableRows = (userReportList) => {
  let rows = _.map(userReportList, (userReportDetails, file_url) => {
    return (
      <tr key={file_url}>
        <td>{userReportDetails.health_update}</td>
        <td>{userReportDetails.dr_name}</td>
        <td>{userReportDetails.datetime}</td>
      </tr>
    );
  });

  if (!rows.length) {
    rows.push(
      <tr key="0">
        <td colSpan="7" className="">
          User doesn't have any health updates
        </td>
      </tr>
    );
  }

  return rows;
};

function UploadReportData() {
  const { id } = useParams();
  const userData = localStorage.getItem('user_data');
  const userData_parsed = JSON.parse(userData);

  const hospitalId = localStorage.getItem('hospital_id');
  const [userReportList, setUserReportList] = useState([]);
  const [userReportListCurrent, setUserReportListCurrent] = useState([]);

  const userReportsData = async (params) => {
    const userReports = await handlers.fetchUserUpdates(params);
    let reportsData = userReports?.data?.history;
    let reportsDataCurrent = userReports?.data?.current;

    setUserReportList(reportsData);
    setUserReportListCurrent(reportsDataCurrent);
    return reportsData;
  };

  useEffect(() => {
    let params = {
      user_id: userData_parsed.user_id,
      hospital_id: hospitalId 
    };
    const userReports = userReportsData(params);
  }, []);

  const [userDetails, setUserDetails] = useState([]);

  const fetchUserData = async (params) => {
    const userReports = await handlers.fetchUserDetails(params);
    let reportsData = userReports?.data;

    setUserDetails(reportsData);
    return reportsData;
  };

  useEffect(() => {
    let params = {
      user_id: id,
    };
    const userDetail = fetchUserData(params);
  }, []);

  return (
    <div>
      <div>
        <h2>Uploaded reports for the user</h2>

        <Link to={`/upload-user-health/${id}`} className="btn btn-primary">Add new health update</Link>

      </div>

      {userDetails.is_admit && (
<div>
      <h3>Current Updates</h3>
    <table
      style={{
        border: "1px solid #1c62ab",
        marginLeft: "30%",
        marginBottom: "50px",
      }}
      id="dtBasicExample"
      className="table table-farms"
      cellspacing="10%"
      width="40%"
    >
      <thead>
        <tr>
          <th class="th-sm">Health Update</th>
          <th class="th-sm">Doctor Name</th>
          <th class="th-sm">Upload Date</th>
        </tr>
      </thead>

      <tbody>{renderTableRows(userReportListCurrent)}</tbody>
    </table>
    </div>

      )}
    <h3>History Updates</h3>
    <table
      style={{
        border: "1px solid #1c62ab",
        marginLeft: "30%",
        // marginBottom: "50px",
      }}
      id="dtBasicExample"
      className="table table-farms"
      cellspacing="10%"
      width="40%"
    >
      <thead>
        <tr>
          <th class="th-sm">Health Update</th>
          <th class="th-sm">Doctor Name</th>
          <th class="th-sm">Upload Date</th>
        </tr>
      </thead>

      <tbody>{renderTableRows(userReportList)}</tbody>
    </table>
    </div>
  );
}

export default UploadReportData;
