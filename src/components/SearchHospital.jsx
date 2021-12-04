import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import FormikMaterialTextField from "./FormikMaterialTextField";
import * as handlers from "./handlers";
import UploadDocument from "./UploadDocument";
// import Table from "react-bootstrap/Table";
import _ from "lodash";
import { Link, useParams } from "react-router-dom";
import history from "./lib/history";

import { Col, Container, Row, Card, CardBody, ButtonToolbar } from "reactstrap";

import PDFView from "./PDFView";
import { Table, Input, Button, Popconfirm } from "antd";


function FetchHospitalData() {
  const { id } = useParams();

  const userData = localStorage.getItem("user_data");
  const userIdLocal = localStorage.getItem("user_id");

  const userData_parsed = JSON.parse(userData);

  const [userReportList, setUserReportList] = useState([]);

  const [showSearchPatient, setShowSearchPatient] = useState(false);

  let tableData = userReportList;

  const [localToken1, setLocalToken1] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const localTokenCalled = localStorage.getItem("token");
    if (localTokenCalled != null) {
      setLocalToken1(localTokenCalled);
    }
    if (localTokenCalled == null) {
      window.location.reload();
    }
  }, [localToken1]);

  const handleDelete = async (id, is_active) => {
    try {

      let params = {
        id: id,
        user_id: userIdLocal,
        is_active: is_active
      }
      let res = await handlers.disableHospital(params);
      if(res.is_success == true){
        window.location.reload();
      }
      console.log("ConfirmDeleteModal-->handleConfirmErr---->");
    } catch (err) {
      console.log("ConfirmDeleteModal-->handleConfirmErr---->", err);
    }
  };

  const handleRemove = async (id, is_active) => {
    try {

      let params = {
        id: id,
        user_id: userIdLocal,
      }
      let res = await handlers.deleteHospital(params);
      if(res.is_success == true){
        window.location.reload();
      }
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
        <div>
        <Popconfirm
          title= {record.is_active ? "Sure to disable?" : "Sure to enable?" }
          onConfirm={() => handleDelete(record.id, record.is_active)}
        >
          <a style={!record.is_active ? {color: 'red'} : {color: 'green'}}>{record.is_active ? 'Disable' : 'Enable'}</a>
        </Popconfirm>
        
        <Link 
        onClick={() => localStorage.setItem('editHospital', JSON.stringify(record))}
        style={{marginLeft: 15}}
        to={{
          pathname: `/edit-hospital`, 
          query:{test: "test"}
        }}>
       Edit
        </Link>

        <Popconfirm
          title= "Sure to delete?"
          onConfirm={() => handleRemove(record.id, record.is_active)}
        >
          <a style={{color: 'red', marginLeft: 15}}>Delete</a>
        </Popconfirm>

        
       </div>
      ),
    },
  ];

  const searchUserSuperUser = async(username) => {
    console.log('searched user usper', username)
    let params={
      username : username
    }
    let success = await handlers.searchUserSuperuser(params);

    console.log('success121212', success)
    if (success.data.user_id) {
      history.push(`/user-details/${success.data.user_id}`);
      window.location.reload();
    }

    if (success) {
      // setSearchUser(success.data.username);
      // setUserId(success.data.user_id);
      localStorage.setItem("searched_user_data", JSON.stringify(success.data));
    }
  }

  const userReportsData = async (localToken1) => {
    let userReports = {};
    if(localToken1){
     userReports = await handlers.fetchHospitalList(localToken1, userIdLocal );
    }
    let reportsData = userReports?.response_message;
    setUserReportList(reportsData);
    return reportsData;
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
        <h2>Hospital and User Details</h2>

<Row>
        <a href={`/add-hospital`}>
          <button type="button" class="btn btn-success btn-sm">
            Add New Hospital
          </button>
        </a>


        <a>
          <button type="button" onClick={ () => setShowSearchPatient(!showSearchPatient) } style={{marginLeft: 60}} class="btn btn-success btn-sm">
            Search Patient
          </button>
        </a>

        </Row>
      </div>
      

      {showSearchPatient && (
      <React.Fragment>
        <Formik
          initialValues={{}}
          onSubmit={async (values, formikBag) => {
            console.log('values in search', values)
            values.localToken = localToken1;
            let success = await handlers.searchUser(values, formikBag);

            // if (success.data.user_id) {
            //   history.push(`/upload-details/${success.data.user_id}`);
            //   window.location.reload();
            // }

            // if (success) {
            //   setSearchUser(success.data.username);
            //   setUserId(success.data.user_id);
            //   localStorage.setItem("user_data", JSON.stringify(success.data));
            // }
          }}
        >
          {(formikBag) => {
            const {
              isSubmitting,
              errors,
              values,
              touched,
              setErrors,
              setFieldValue,
              handleSubmit,
            } = formikBag;

            return (
              <div
                style={{
                  // width: "30%",
                  padding: 30,
                  border: "2px solid grey",
                  // marginLeft: "35%",
                  // marginTop: "20px",
                  backgroundColor: "white",
                }}
              >
                <Form className="formik-form">
                  <div className="col">
                    <h3 className="form-group-label">Search patient</h3>

                    <div className="form-group-field custom-input with-extention">
                      <Field
                        name="username"
                        component={FormikMaterialTextField}
                        // type="number"
                        placeholder="Enter phone number"
                      />
                    </div>
                  </div>

                  <br />
                  {/* {searchUser === undefined && (
                    <p>No record found, please register</p>
                  )} */}
                  <div className="btn-wrapper">
                    <Button type="button" onClick = {() => searchUserSuperUser(values.username)} >
                      Search
                    </Button>
                  </div>
                </Form>
              </div>
            );
          }}
        </Formik>
      </React.Fragment>
      )}

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
                  marginTop: "20px",
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
