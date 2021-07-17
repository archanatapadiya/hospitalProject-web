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

function FetchHospitalData() {
  const { id } = useParams();

  const userData = localStorage.getItem("user_data");
  const userData_parsed = JSON.parse(userData);

  const [userReportList, setUserReportList] = useState([]);

  let tableData = userReportList;

  const [localToken1, setLocalToken1] = useState("");

  useEffect(() => {
    const localTokenCalled = localStorage.getItem("token");
    if (localTokenCalled != null) {
      setLocalToken1(localTokenCalled);
    }
  }, []);

  console.log("localtoken in search hospi", localToken1);

  const handleDelete = async (id) => {
    try {
      let res = await handlers.deleteHospital(id);
      // if(res.is_success == true){
      //   window.location.reload();
      // }
      console.log("ConfirmDeleteModal-->handleConfirmErr---->");
    } catch (err) {
      console.log("ConfirmDeleteModal-->handleConfirmErr---->", err);
    }
  };

  const HOSPITAL_TABLE_HEADER = [
    {
      title: "Hospital Name",
      dataIndex: "name",
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
      title: "Phone_Number",
      dataIndex: "phone_number",
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
      title: "Email",
      dataIndex: "email",
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
      title: "Address",
      dataIndex: "address",
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
      title: "Operation",
      dataIndex: "operation",
      render: (text, record) => (
        <Popconfirm
          title="Sure to disable?"
          onConfirm={() => handleDelete(record.id)}
        >
          <a>Disable</a>
        </Popconfirm>
      ),
    },
  ];

  const userReportsData = async (localToken1) => {
    let userReports = {};
    if(localToken1){
     userReports = await handlers.fetchHospitalList(localToken1);
    }
    let reportsData = userReports?.response_message;
    setUserReportList(reportsData);
    return reportsData;

    // return fetch(`http://65.2.26.144:8000/fetch_hospitals/`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //     Authorization: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFyY2hhbmEiLCJleHAiOjE2NTc4NjM0NjV9.zqTBrcj0yT0SJzUNwhUCmC-ybmb0FjwL5btMZgAuZCQ",
    //      'Cookie': 'sessionid=qdcsyxep01irnp93y46pzynwrn7h1fc9',
    //   },
    //   // body: JSON.stringify(bodyparams)
    // })
    //   .then(data => data.json())
  };

  useEffect(() => {
    const userReports = userReportsData(localToken1);
  }, [localToken1]);

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
      }}
    >
      <div>
        <h2>Uploaded bills for the user</h2>

        <a href={`/add-hospital`}>
          <button type="button" class="btn btn-success btn-sm">
            Add New Hospital
          </button>
        </a>
      </div>

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
                List of hospitals
                <br />
              </span>
              <br />

              <Table
                columns={HOSPITAL_TABLE_HEADER}
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

export default FetchHospitalData;
