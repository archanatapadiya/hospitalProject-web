import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import FormikMaterialTextField from "./FormikMaterialTextField";
import * as handlers from "./handlers";
import { Route, Switch, NavLink } from "react-router-dom";
import styles from "./styles.css";
import { Link, useParams } from "react-router-dom";
import _ from "lodash";
import ArrowIcon from 'mdi-react/ArrowBackIcon';

import {
  Col,
  Container,
  Row,
  Card,
  CardBody,
  ButtonToolbar,
  Button,
} from "reactstrap";
// import { uploadUserReports } from "./utils/api";
import FetchUserReports from "./FetchUserReports";
import FetchUserUpdates from "./FetchUserUpdates";
import FetchUserBilling from "./FetchUserBilling";
import UploadUserReports from "./UploadUserReports";
import UploadUserUpdates from "./UploadUserUpdates";
import UploadUserBilling from "./UploadUserBilling";
import { Table, Input, Popconfirm } from 'antd';

import notifications from './notifications';
import { setSourceMapRange } from "typescript";

function UploadData() {
  const { id } = useParams();
  const hospitalId = localStorage.getItem("hospital_id");

  const searchedUserData = localStorage.getItem("searched_user_data");

  const searchedUserData_parsed = JSON.parse(searchedUserData);

  localStorage.setItem("user_data", JSON.stringify(searchedUserData_parsed));

  const [show, setShow] = useState(false);

 

  const [userData, setUserData] = useState([]);
  const [sure1, setSure1] = useState(false);

  const patientName = userData?.first_name + " " + userData?.last_name;

  const fetchUserData = async (params) => {
    const userReports = await handlers.fetchUserDetails(params);
    let reportsData = userReports?.data;

    setUserData(reportsData);
    return reportsData;
  };

  let tableData = {};
  
  tableData = _.get(searchedUserData_parsed, 'hospital_list');

  const BILL_TABLE_HEADER = [
   
    {
      title: "Hospital Name",
      dataIndex: "hospital_name",
      width: "200px",
      align: "center",
      render: (text, record) => <
        Link 
        to={{
          pathname: `/upload-details/${searchedUserData_parsed.user_id}`, 
          query:{hosp_id: record}
        }}>
       {text}
        </Link>
    },
    {
      title: "Contact Number",
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
   
     
  ];


  useEffect(() => {
    let params = {
      user_id: id,
    };
    const userDetails = fetchUserData(params);
  }, []);

  let textInput = React.createRef();


  return (
    <React.Fragment>
      <div className="login-wrapper" style={{   boxShadow: '0px 0px 10px #0000001a',
      border: '1px solid #c9c9c9',
      padding: 50,
      marginLeft: 300,
      marginRight: 300,
      marginTop: 50,
      backgroundColor: '#F7FBF9',
      opacity: 1}}>
        <a href={`/`} style={{marginLeft: '-95%'}}>     
          <ArrowIcon /> 
        </a>
        <h2 style={{ textDecoration: "underline" }}>Patient Details</h2>
        <div
          style={{
            // width: "30%",
            padding: 20,
            border: "2px solid grey",
            // marginLeft: "35%",
            marginTop: "20px",
            backgroundColor: 'white'
          }}
        >
          <p>
            <span style={{ fontWeight: "bold" }}>Patient Name:</span>{" "}
            {patientName}
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>Email:</span> {userData?.email}
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>Address: </span>
            {userData?.address}
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>Phone Number: </span>
            {userData?.phone_number}
          </p>
          {userData.is_admit && (
            <p>
              <span style={{ fontWeight: "bold" }}>Room No.: </span>
              {userData?.room_number}
            </p>
          )}
        </div>

<br />



        <h2 style={{ textDecoration: "underline" }}>List of admitted hospitals</h2>
     
<br />
        <Table
                columns={BILL_TABLE_HEADER}
                dataSource={tableData}
                bordered
                size="small"
                pagination={false}
                style={{
                  whiteSpace: "pre",
                  border: "1px solid grey",
                }}
              />
  


        <Switch>
          <Route path={`/fetch-user-reports/:id(\d*)`}>
            <FetchUserReports />
          </Route>

          <Route path={`/fetch-user-health/:id(\d*)`}>
            <FetchUserUpdates />
          </Route>

          <Route exact path={`/fetch-user-billing/:id(\d*)`}>
            <FetchUserBilling />
          </Route>

          <Route path={`/upload-user-reports/:id(\d*)`}>
            <UploadUserReports />
          </Route>

          <Route path={`/upload-user-health/:id(\d*)`}>
            <UploadUserUpdates />
          </Route>

          <Route exact path={`/upload-user-billing/:id(\d*)`}>
            <UploadUserBilling />
          </Route>

          <Route exact path={`/admit-user`}>
            <UploadUserBilling />
          </Route>
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default UploadData;
