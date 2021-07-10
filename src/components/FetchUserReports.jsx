import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import FormikMaterialTextField from "./FormikMaterialTextField";
import * as handlers from "./handlers";
import UploadDocument from "./UploadDocument";
// import Table from "react-bootstrap/Table";
import _ from "lodash";
import { Link, useParams } from "react-router-dom";

import {
  Col,
  Container,
  Row,
  Card,
  CardBody,
  ButtonToolbar,
  
} from "reactstrap";

import PDFView from "./PDFView";
import { Table, Input, Button, Popconfirm } from 'antd';


function UploadReportData() {

  const { id } = useParams();
  const userData = localStorage.getItem('user_data');
  const userData_parsed = JSON.parse(userData);

  const hospitalId = localStorage.getItem('hospital_id');

  const [userReportList, setUserReportList] = useState([]);
  const [userReportListCurrent, setUserReportListCurrent] = useState([]);

  let tableData = userReportList;
  let tableDataCurrent = userReportListCurrent;

  const handleDelete = async (id) => {
    try {
      let res = await handlers.deleteUserReports(id);
      if(res.is_success == true){
        window.location.reload();
      }
    } catch (err) {
      console.log('ConfirmDeleteModal-->handleConfirmErr---->', err);
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
      dataIndex: "event_time",
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
      title: 'Operation',
      dataIndex: 'operation',
      render: (text, record) =>

          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
            <a>Delete</a>
          </Popconfirm>
      
    },
  ];

  const userReportsData = async (params) => {
    const userReports = await handlers.fetchUserReport(params);
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
    <div className="login-wrapper" style={{   boxShadow: '0px 0px 10px #0000001a',
    border: '1px solid #c9c9c9',
    padding: 50,
    marginLeft: 200,
    marginRight: 200,
    marginTop: 50,
    backgroundColor: '#F7FBF9',
    opacity: 1}}>
      <div>
        <h2>Uploaded reports for the user</h2>

        <a href={`/upload-user-reports/${id}`} >
      <button type="button" class="btn btn-success btn-sm">Add New Report</button>
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
                  color: "#1b62ab",
                  fontSize: "16px",
                  fontWeight: "bold",
                  marginTop: "10px",
                }}
              >
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
  );
}

export default UploadReportData;
