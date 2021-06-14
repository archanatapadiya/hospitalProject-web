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
        <td>{userReportDetails.file_name}</td>
        <td>{userReportDetails.event_time}</td>
      </tr>
    );
  });

  if (!rows.length) {
    rows.push(
      <tr key="0">
        <td colSpan="7" className="">
          User doesn't have any uploaded bills
        </td>
      </tr>
    );
  }

  return rows;
};

function UploadReportData() {
  const [userReportList, setUserReportList] = useState([]);

  const userReportsData = async (params) => {
    const userReports = await handlers.fetchUserBilling(params);
    let reportsData = userReports?.data?.history;

    setUserReportList(reportsData);
    return reportsData;
  };

  useEffect(() => {
    let params = {
      user_id: 9,
      hospital_id: 1,
    };
    const userReports = userReportsData(params);
  }, []);

  return (
    <div>
      <div>
        <h2>Uploaded billings for the user</h2>

        <Link to="/upload-user-billing" className="btn btn-primary">Add new bill</Link>

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
          <th class="th-sm">Upload Date</th>
        </tr>
      </thead>

      <tbody>{renderTableRows(userReportList)}</tbody>
    </table>
    </div>
  );
}

export default UploadReportData;
