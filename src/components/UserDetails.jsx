import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import FormikMaterialTextField from "./FormikMaterialTextField";
import * as handlers from "./handlers";
import { Route, Switch, NavLink } from "react-router-dom";
import styles from "./styles.css";
import { Link, useParams } from "react-router-dom";
import _ from "lodash";
import ArrowIcon from "mdi-react/ArrowBackIcon";
import {
  Col,
  Container,
  Row,
  Card,
  CardBody,
  ButtonToolbar,
  Button,
} from "reactstrap";
import FetchUserReports from "./FetchUserReports";
import FetchUserUpdates from "./FetchUserUpdates";
import FetchUserBilling from "./FetchUserBilling";
import UploadUserReports from "./UploadUserReports";
import UploadUserUpdates from "./UploadUserUpdates";
import UploadUserBilling from "./UploadUserBilling";
import { Table, Input, Popconfirm } from "antd";
import notifications from "./notifications";
import { setSourceMapRange } from "typescript";
import Background from '../components/images/background.jpeg';
import NameAndLogo from './NameAndLogo';


function UploadData() {
  const { id } = useParams();
  const hospitalId = localStorage.getItem("hospital_id");
  const searchedUserData = localStorage.getItem("searched_user_details");
  const searchedUserData_parsed = JSON.parse(searchedUserData);
  localStorage.setItem("user_data", JSON.stringify(searchedUserData_parsed));
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState([]);
  const [sure1, setSure1] = useState(false);
  const patientName = userData?.first_name + " " + userData?.last_name;
  const fetchUserData = async (params) => {
    const userReports = await handlers.fetchUserDetails(params);

    let reportsData = userReports?.data;

    if (reportsData) {
      localStorage.setItem("searched_user_data", JSON.stringify(reportsData));
    }

    setUserData(reportsData);
    return reportsData;
  };

  let tableData = {};
  let tableData1 = {};

  tableData1 = _.get(searchedUserData_parsed, "hospital_list");

   tableData = tableData1.filter(function (item) {
    return item.hospital_id != null;
  });

  console.log('tableDatatableData', tableData)

  let searchedUserId = _.get(searchedUserData_parsed, "user_id");
  let searchedUserUsername = _.get(searchedUserData_parsed, "username");

  const handleRemove = async (id) => {

    let params = {
      user_id: searchedUserId,
      hospital_id: id
    }
    let res = await handlers.deletePatientFromHosp(params); 

    if(res.is_success == true){
      // window.location.reload();

      let params = {
        username: searchedUserUsername,
      };
      let success = await handlers.searchUserSuperuser(params);
  
      if (success.data.user_id) {
        // history.push(`/user-details/${success.data.user_id}`);
        window.location.reload();
      }
  
      if (success) {
        localStorage.setItem("searched_user_details", JSON.stringify(success.data));
      }

    }
  };

  const BILL_TABLE_HEADER = [
    {
      title: "Health Center Name",
      dataIndex: "hospital_name",
      width: "200px",
      align: "center",
      render: (text, record) => (
        <Link
          to={{
            pathname: `/upload-details/${searchedUserData_parsed.user_id}`,
            query: { hosp_id: record },
          }}
        >
          {text}
        </Link>
      ),
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
    {
      title: "Operation",
      dataIndex: "operation",
      render: (text, record) => (
        <div>
          <Popconfirm
          title= "Sure to delete?"
          onConfirm={() => handleRemove(record.hospital_id)}
        >
          <a style={{color: 'red', marginLeft: 15}}>Delete</a>
        </Popconfirm>
        </div>
      ),
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
      <div
        className="login-wrapper"
        style={{
          boxShadow: "0px 0px 10px #0000001a",
          border: "1px solid #c9c9c9",
          padding: 50,
          marginLeft: 300,
          marginRight: 300,
          marginTop: 50,
          backgroundColor: "#F7FBF9",
          opacity: 1,
          background: `url(${Background})`,
          backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
        }}
      >
        <NameAndLogo />
        <a href={`/superuser-login`} style={{ marginLeft: "-95%" , color: '#D3ECF9'}}>
          <ArrowIcon />
        </a>
        <h2 style={{ textDecoration: "underline", color: '#D3ECF9' }}>Patient Details</h2>

        <button class="btn btn-success btn-sm">
        <a href={`/edit-patient-details/${id}`} >
        Edit Patient Details
        </a>
                 
        </button>
        
        <div
          style={{
            padding: 20,
            border: "2px solid grey",
            marginTop: "20px",
            backgroundColor: "white",
            textAlign: 'left'
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
          <hr
        style={{
            color: "black",
            backgroundColor: "black",
            height: 1
        }}
    />
          )}
          {userData.is_admit && (
            <p>
              <span style={{ fontWeight: "bold" }}>Current Admission:  </span>
              {userData?.Hospital_name}
            </p>
          )}
          {userData.is_admit && (
            <p>
              <span style={{ fontWeight: "bold" }}>Room No.: </span>
              {userData?.room_number}
            </p>
          )}
        </div>

        <br />

        <h2 style={{ textDecoration: "underline", color: '#D3ECF9' }}>
          List Of Visited Health Centers 
        </h2>

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
