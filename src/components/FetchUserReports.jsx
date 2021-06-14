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
        
        <td><a target="_blank" href={userReportDetails.file_url}>
        {userReportDetails.file_name}
      </a>
     </td>
     <td>{userReportDetails.description}</td>
        <td>{userReportDetails.event_time}</td>
      </tr>
    );
  });

  if (!rows.length) {
    rows.push(
      <tr key="0">
        <td colSpan="7" className="">
          User doesn't have any uploaded reports
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

  const userReportsData = async (params) => {
    const userReports = await handlers.fetchUserReport(params);
    let reportsData = userReports?.data?.history;

    setUserReportList(reportsData);
    return reportsData;
  };

  useEffect(() => {
    let params = {
      user_id: userData_parsed.user_id,
      hospital_id: hospitalId 
    };
    const userReports = userReportsData(params);
  }, []);

  return (
    <div>
      <div>
        <h2>Uploaded reports for the user</h2>

        <Link to={`/upload-user-reports/${id}`} className="btn btn-primary">Add new report</Link>
      </div>
    <table
      style={{
        border: "1px solid #1c62ab",
        marginLeft: "30%",
        marginTop: "50px",
      }}
      id="dtBasicExample"
      className="table table-farms"
      cellspacing="10%"
      width="40%"
    >
      <thead>
        <tr>
          <th class="th-sm">File Name</th>
          <th class="th-sm">Description</th>
          <th class="th-sm">Upload Date</th>
        </tr>
      </thead>

      <tbody>{renderTableRows(userReportList)}</tbody>
    </table>
    </div>
  );
}

export default UploadReportData;
