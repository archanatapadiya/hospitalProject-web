import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import FormikMaterialTextField from "./FormikMaterialTextField";
import * as handlers from "./handlers";
import UploadDocument from "./UploadDocument";
import _ from "lodash";
import { Link, useParams } from "react-router-dom";
import 'antd/dist/antd.css';

import {
  Col,
  Container,
  Row,
  Card,
  CardBody,
  ButtonToolbar,
  } from "reactstrap";

import PDFView from "./PDFView";
import AntTableActions from './AntTableActions';
import { Table, Input, Button, Popconfirm } from 'antd';




function UploadReportData() {
  const { id } = useParams();
  const userData = localStorage.getItem("user_data");
  const userData_parsed = JSON.parse(userData);

  const hospitalId = localStorage.getItem("hospital_id");
  const [userReportList, setUserReportList] = useState([]);
  const [userReportListCurrent, setUserReportListCurrent] = useState([]);

  let tableData = userReportList;

  let tableDataCurrent = userReportListCurrent;


  const handleDelete = async (id) => {
    try {
      let res = await handlers.deleteUserUpdates(id);
    } catch (err) {
      console.log('ConfirmDeleteModal-->handleConfirmErr---->', err);
    }
  };

 

  const HEALTH_TABLE_HEADER = [
    {
      title: "Health Update",
      dataIndex: "health_update",
      width: "200px",
      align: "center",
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
      title: "Dr. Name",
      dataIndex: "dr_name",
      width: "200px",
      align: "center",
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
      title: "Upload Date",
      dataIndex: "datetime",
      width: "200px",
      align: "center",
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
      title: 'operation',
      dataIndex: 'operation',
      render: (text, record) =>

          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
            <a>Delete</a>
          </Popconfirm>
      
    },
  ];

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
      hospital_id: hospitalId,
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
    <div className="login-wrapper" style={{   boxShadow: '0px 0px 10px #0000001a',
    border: '1px solid #c9c9c9',
    padding: 50,
    marginLeft: 100,
    marginRight: 100,
    marginTop: 50,
    backgroundColor: '#F7FBF9',
    opacity: 1}}>
      <div>
        <h2>Health updates for the user</h2>

        <a href={`/upload-user-health/${id}`}  >
      <button type="button" class="btn btn-success btn-sm"> Add New Health Update</button>
   </a> 

       
      </div>

      {userDetails.is_admit && (
  
      
        <div className="form-container">
        <div className="farm-wrapper">
          <div className="farm-table">
            <div className="table-farms-wrapper">
            <br />
              <span
                style={{
                  color: "#1b62ab",
                  fontSize: "16px",
                  fontWeight: "bold",
                  marginTop: "10px",
                }}
              >
                Current Updates
                <br />
              </span>
              <br />

              <Table
                columns={HEALTH_TABLE_HEADER}
                dataSource={tableDataCurrent}
                bordered
                size="small"
                pagination={false}
                style={{
                  whiteSpace: "pre",
                  border: "1px solid grey",
                  // borderRadius: "10px",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      )}
      {/* <h3>History Updates</h3> */}

    
      <div className="form-container">
        <div className="farm-wrapper">
          <div className="farm-table">
            <div className="table-farms-wrapper">
              <span
                style={{
                  color: "#1b62ab",
                  fontSize: "16px",
                  fontWeight: "bold",
                  marginTop: "10px",
                }}
              >
                History Updates
                <br />
              </span>
              <br />

              <Table
                columns={HEALTH_TABLE_HEADER}
                dataSource={tableData}
                bordered
                size="small"
                pagination={false}
                style={{
                  whiteSpace: "pre",
                  border: "1px solid grey",
                  // borderRadius: "10px",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* <table
      style={{
        border: "1px solid #1c62ab",
        // marginLeft: "30%",
        // marginBottom: "50px",
      }}
      id="dtBasicExample"
      className="table table-farms"
      cellspacing="10%"
      // width="40%"
    >
      <thead>
        <tr>
          <th class="th-sm">Health Update</th>
          <th class="th-sm">Doctor Name</th>
          <th class="th-sm">Upload Date</th>
        </tr>
      </thead>

      <tbody>{renderTableRows(userReportList)}</tbody>
    </table> */}
    </div>
  );
}

export default UploadReportData;
