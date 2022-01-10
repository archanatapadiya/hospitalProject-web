import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import FormikMaterialTextField from "./FormikMaterialTextField";
import * as handlers from "./handlers";
import UploadDocument from "./UploadDocument";
// import Table from "react-bootstrap/Table";
import _ from "lodash";
import { Link, useParams } from "react-router-dom";

import { Col, Container, Row, Card, CardBody, ButtonToolbar } from "reactstrap";

import PDFView from "./PDFView";
import { Table, Input, Button, Popconfirm } from "antd";
import Background from '../components/images/background.jpeg';
import NameAndLogo from './NameAndLogo';

function UploadReportData(props) {
  console.log("hospital_type in fetch reports", props.hospitalType);

  const { id } = useParams();
  const userData = localStorage.getItem("user_data");
  const userData_parsed = JSON.parse(userData);

  const hospitalId = localStorage.getItem("hospital_id");

  const [userReportList, setUserReportList] = useState([]);
  const [userReportListCurrent, setUserReportListCurrent] = useState([]);
  const [userReportListOpd, setUserReportListOpd] = useState([]);
  let hospital_type = localStorage.getItem("hospital_type");

  let tableData = userReportList;
  let tableDataCurrent = userReportListCurrent;
  let tableDataOpd = userReportListOpd;


  const handleDelete = async (id) => {
    try {
      let res = await handlers.deleteUserReports(id);
      if (res.is_success == true) {
        window.location.reload();
      }
    } catch (err) {
      console.log("ConfirmDeleteModal-->handleConfirmErr---->", err);
    }
  };

  const REPORT_TABLE_HEADER = [
    {
      title: "File Name",
      dataIndex: "file_name",
      width: "200px",
      align: "center",
      render: (text, row) => (
        <PDFView file_name={row.file_name} file_url={row.file_url} />
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      width: "200px",
      align: "center",
      render: (value, row, index) => {
        const obj = {
          children: value,
          props: {},
        };
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
        return obj;
      },
    },
    {
      title: "Test Date",
      dataIndex: "testdate",
      width: "200px",
      align: "center",
      render: (value, row, index) => {
        const obj = {
          children: value,
          props: {},
        };
        return obj;
      },
    },
    {
      title: "Upload Date",
      dataIndex: "event_time",
      width: "200px",
      align: "center",
      render: (value, row, index) => {
        const obj = {
          children: value,
          props: {},
        };
        return obj;
      },
    },
    {
      title: "Operation",
      dataIndex: "operation",
      render: (text, record) => (
        <Popconfirm
          title="Sure to delete?"
          onConfirm={() => handleDelete(record.id)}
        >
          <a>Delete</a>
        </Popconfirm>
      ),
    },
  ];

  const userReportsData = async (params) => {
    const userReports = await handlers.fetchUserReport(params);
    let reportsData = userReports?.data?.history;
    let reportsDataCurrent = userReports?.data?.current;
    let reportsDataOpd = userReports?.data?.opd;

    setUserReportList(reportsData);
    setUserReportListCurrent(reportsDataCurrent);
    setUserReportListOpd(reportsDataOpd);

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

  const searchedUserData = localStorage.getItem("searched_user_data");
  const searchedUserData_parsed = JSON.parse(searchedUserData);
  const isSuperuser = localStorage.getItem("isSuperuser");

  return (
    <div
      className="login-wrapper"
      style={{
        boxShadow: "0px 0px 10px #0000001a",
        border: "1px solid #c9c9c9",
        padding: 50,
        marginLeft: 200,
        marginRight: 200,
        marginTop: 50,
        backgroundColor: "#F7FBF9",
        opacity: 1,
        background: `url(${Background})`,
        backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat'
      }}
    >
      <NameAndLogo/>
      <div style={{width: '100%',  textAlign:'right'}}>
      <a href={isSuperuser == "true" ? `/superuser-login`:`/`}  >
      <button style={{marginRight: 10}} type="button" class="btn btn-success btn-sm">Search Patient</button>
   </a> 
   <a href={`/upload-details/${searchedUserData_parsed.user_id}`}  >
      <button type="button" class="btn btn-success btn-sm">Patient Details</button>
   </a> 
   </div>

      <div>
        <h2 style={{color: '#D3ECF9'}}>Uploaded reports for the user</h2>

        <h2 style={{ textDecoration: "underline", color: '#D3ECF9' }}>Patient Details</h2>
        <div
          style={{
            // width: "30%",
            padding: 20,
            border: "2px solid grey",
            // marginLeft: "35%",
            marginTop: "20px",
            backgroundColor: "white",
            textAlign: 'left'
          }}
        >
          <p>
            <span style={{ fontWeight: "bold" }}>Patient Name:</span>{" "}
            {searchedUserData_parsed?.first_name}{ ' '}{searchedUserData_parsed?.last_name}
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>Email:</span> {searchedUserData_parsed?.email}
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>Address: </span>
            {searchedUserData_parsed?.address}
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>Phone Number: </span>
            {searchedUserData_parsed?.phone_number}
          </p>
         
          {searchedUserData_parsed?.is_admit && (
            <p>
              <span style={{ fontWeight: "bold" }}>Room No.: </span>
              {searchedUserData_parsed?.room_number}
            </p>
          )}
        </div>
        <br />

        <a href={`/upload-user-reports/${id}`}>
          <button type="button" class="btn btn-success btn-sm">
            Add New Report
          </button>
        </a>
      </div>

      <br />
      {hospital_type != 2 && (
        <div>
          <div className="form-container">
            <div className="farm-wrapper">
              <div className="farm-table">
                <div className="table-farms-wrapper">
                  <span
                    style={{
                      color: '#D3ECF9',
                      fontSize: "16px",
                      fontWeight: "bold",
                      marginTop: "10px",
                      textDecoration: "underline",
                    }}
                  >
                    OPD REPORTS
                    <br />
                  </span>
                  <br />

                  <Table
                    columns={REPORT_TABLE_HEADER}
                    dataSource={tableDataOpd}
                    bordered
                    size="small"
                    pagination={false}
                    style={{
                      whiteSpace: "pre",
                      border: "1px solid grey",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {hospital_type != 1 && (
        <div>
          <span
            style={{
              color: '#D3ECF9',
              fontSize: "16px",
              fontWeight: "bold",
              marginTop: "10px",
              textDecoration: "underline",
            }}
          >
            IPD REPORTS
            <br />
          </span>
          {userDetails.is_admit && (
            <div className="form-container">
              <div className="farm-wrapper">
                <div className="farm-table">
                  <div className="table-farms-wrapper">
                    <br />
                    <span
                      style={{
                        color: '#D3ECF9',
                        fontSize: "14px",
                        fontWeight: "bold",
                        marginTop: "10px",
                      }}
                    >
                      Current Reports
                      <br />
                    </span>
                    <br />

                    <Table
                      columns={REPORT_TABLE_HEADER}
                      dataSource={tableDataCurrent}
                      bordered
                      size="small"
                      pagination={false}
                      style={{
                        whiteSpace: "pre",
                        border: "1px solid grey",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="form-container">
            <div className="farm-wrapper">
              <div className="farm-table">
                <div className="table-farms-wrapper">
                  <span
                    style={{
                      color: '#D3ECF9',
                      fontSize: "14px",
                      fontWeight: "bold",
                      marginTop: "10px",
                    }}
                  >
                      <br />
                    History Reports
                    <br />
                  </span>
                  <br />

                  <Table
                    columns={REPORT_TABLE_HEADER}
                    dataSource={tableData}
                    bordered
                    size="small"
                    pagination={false}
                    style={{
                      whiteSpace: "pre",
                      border: "1px solid grey",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UploadReportData;
