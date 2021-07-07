import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import FormikMaterialTextField from "./FormikMaterialTextField";
import * as handlers from "./handlers";
import UploadDocument from "./UploadDocument";
// import Table from "react-bootstrap/Table";
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


import { Table } from 'antd';
import PDFView from './PDFView';


const renderTableRows = (userReportList) => {
  let rows = _.map(userReportList, (userReportDetails, file_url) => {
    return (
      <tr key={file_url}>
         <td><a target="_blank" href={userReportDetails.file_url}>
        {userReportDetails.bill_file_name}
      </a>
     </td>
        <td>{userReportDetails.remark}</td>
        <td>{userReportDetails.billing_time}</td>
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
  const { id } = useParams();

  const userData = localStorage.getItem('user_data');
  const userData_parsed = JSON.parse(userData);

  const hospitalId = localStorage.getItem('hospital_id');

  const [userReportList, setUserReportList] = useState([]);
  const [userReportListCurrent, setUserReportListCurrent] = useState([]);


  let tableData = userReportList;

  const BILL_TABLE_HEADER = [
    {
      title: 'File Name',
      dataIndex: 'bill_file_name',
      width: '200px',
      align: 'center',
      render: (text, row) => (
        <PDFView
        file_name={row.bill_file_name}
        file_url={row.file_url}
        />
      ),
    },
    {
      title: 'Remarks',
      dataIndex: 'remark',
      width: '200px',
      align: 'center',
      render: (value, row, index) => {
        const obj = {
          children: value,
          props: {},
        };
        if (index == 0) {
          obj.props.rowSpan = row.rowSpan;
        } else {
          obj.props.rowSpan = row.rowSpan;
        }
        return obj;
      },
    },
    {
      title: 'Upload Time',
      dataIndex: 'billing_time',
      width: '200px',
      align: 'center',
      render: (value, row, index) => {
        const obj = {
          children: value,
          props: {},
        };
        if (index == 0) {
          obj.props.rowSpan = row.rowSpan;
        } else {
          obj.props.rowSpan = row.rowSpan;
        }
        return obj;
      },
    },
 
  ];

  const userReportsData = async (params) => {
    
    const userReports = await handlers.fetchUserBilling(params);
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
    <div className="login-wrapper">
      <div>
        <h2>Uploaded bills for the user</h2>

        <Link to={`/upload-user-billing/${id}`} className="btn btn-primary">Add new bill</Link>

      </div>

      {userDetails.is_admit && (
        <div>
      <h3>Current Bills</h3>
      <table
      style={{
        border: "1px solid #1c62ab",
        // marginLeft: "30%",
        marginBottom: "50px",
      }}
      id="dtBasicExample"
      className="table table-farms"
      cellspacing="10%"
      width="40%"
    >
      <thead>
        <tr>
          <th class="th-sm">File Name</th>
          <th class="th-sm">Remarks</th>
          <th class="th-sm">Upload Date</th>
        </tr>
      </thead>

      <tbody>{renderTableRows(userReportListCurrent)}</tbody>
    </table>
    </div>
      )}

    {/* <h3>History Bills</h3> */}

    <br />

    <div className="form-container">
            <div className="farm-wrapper">
              <div className="farm-table">
                <div className="table-farms-wrapper">
                  <span style={{ color: '#1b62ab', fontSize: '16px', fontWeight: 'bold', marginTop: '10px' }}>
                   History Bills
                   <br />
                  </span>
                  <br />


    <Table
                    columns={BILL_TABLE_HEADER}
                    dataSource={tableData}
                    bordered
                    size="small"
                    pagination={false}
                    style={{ whiteSpace: 'pre', border: '1px solid grey' , borderRadius: '10px'}}
                  />

</div>
              </div>
            </div>
          </div>

    {/* <table
      style={{
        border: "1px solid #1c62ab",
        // marginLeft: "30%",
        // marginTop: "50px",
      }}
      id="dtBasicExample"
      className="table table-farms"
      cellspacing="10%"
      width="40%"
    >
      <thead>
        <tr>
          <th class="th-sm">File Name</th>
          <th class="th-sm">Remarks</th>
          <th class="th-sm">Upload Date</th>
        </tr>
      </thead>

      <tbody>{renderTableRows(userReportList)}</tbody>
    </table> */}
    </div>
  );
}

export default UploadReportData;
