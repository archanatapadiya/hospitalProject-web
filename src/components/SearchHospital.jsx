import React, { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import FormikMaterialTextField from "./FormikMaterialTextField";
import * as handlers from "./handlers";
import _ from "lodash";
import { Link, useParams } from "react-router-dom";
import history from "./lib/history";
import { Col, Container, Row, Card, CardBody, ButtonToolbar } from "reactstrap";
import { Table, Input, Button, Popconfirm } from "antd";
import logo from "./images/MyMedCordsTransparent.png";
import axios from "axios";
import Background from '../components/images/background.jpeg';

function FetchHospitalData() {
  const { id } = useParams();
  const userData = localStorage.getItem("user_data");
  const userIdLocal = localStorage.getItem("user_id");
  const userData_parsed = JSON.parse(userData);
  const [userReportList, setUserReportList] = useState([]);
  const [showSearchPatient, setShowSearchPatient] = useState(false);
  let tableData = userReportList;
  const [localToken1, setLocalToken1] = useState(localStorage.getItem("token"));
  const localToken = localStorage.getItem("token");
  const patients = localStorage.getItem("patients");
  const hosp_active = localStorage.getItem("hosp_active");
  const hosp_disabled = localStorage.getItem("hosp_disabled");
  const clinic_active = localStorage.getItem("clinic_active");
  const clinic_disabled = localStorage.getItem("clinic_disabled");

  useEffect(() => {
    const localTokenCalled = localStorage.getItem("token");
    if (localTokenCalled != null) {
      setLocalToken1(localTokenCalled);
    }
    if (localTokenCalled == null) {
      window.location.reload();
    }
  }, [localToken1]);

  const handleDelete = async (id, is_active, type) => {
    try {
      let params = {
        id: id,
        user_id: userIdLocal,
        is_active: is_active,
      };
      let res = await handlers.disableHospital(params);
      if (res.is_success == true) {
        
        let hosp_dis = type == 1 ? Number(clinic_disabled) : Number(hosp_disabled)
        let hospi_set;
        {is_active ? 
         hospi_set = hosp_dis + 1
        : 
         hospi_set = hosp_dis - 1
        }
        {type == 1 ?  
        localStorage.setItem("clinic_disabled", hospi_set) : 
        localStorage.setItem("hosp_disabled", hospi_set);
        }
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
      };
      let res = await handlers.deleteHospital(params);
      if (res.is_success == true) {
        window.location.reload();
      }
      console.log("ConfirmDeleteModal-->handleConfirmErr---->");
    } catch (err) {
      console.log("ConfirmDeleteModal-->handleConfirmErr---->", err);
    }
  };

  const clickLogout = async (params) => {
    let url = "http://3.110.35.199/user_logout/";
    axios
      .get(url, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: localToken,
        },
      })
      .then((res) => {
        localStorage.removeItem("token");
        localStorage.removeItem("is_superuser");
        localStorage.removeItem("isSuperuser");
        localStorage.removeItem("user_id");
        localStorage.removeItem("username");
        localStorage.removeItem("hospital_id");
        history.push(`/`);
        window.location.reload();
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  const HOSPITAL_TABLE_HEADER = [
    {
      title: "Health Center Name",
      dataIndex: "name",
      width: "200px",
      // align: "center",
      render: (value, row, index) => {
        const obj = {
          children: value,
          props: {},
        };
        return obj;
      },
    },
    {
      title: "Health Center Type",
      dataIndex: "hospital_type",
      width: "200px",
      align: "center",
      render: (value, row, index) => {
        console.log('value--->', value)
       
        let obj = {
          children: value,
          props: {},
        };

        if(value == 1){
          obj = "OPD"
        }
        if(value == 2){
          obj = "IPD"
        }
        if(value == 3){
          obj = "OPD/IPD"
        }

        return obj;
      },
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number",
      width: "200px",
      // align: "center",
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
      // align: "center",
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
      // align: "center",
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
            title={record.is_active ? "Sure to disable?" : "Sure to enable?"}
            onConfirm={() => handleDelete(record.id, record.is_active, record.hospital_type)}
          >
            <a
              style={!record.is_active ? { color: "red" } : { color: "green" }}
            >
              {record.is_active ? "Disable" : "Enable"}
            </a>
          </Popconfirm>

          <Link
            onClick={() =>
              localStorage.setItem("editHospital", JSON.stringify(record))
            }
            style={{ marginLeft: 15 }}
            to={{
              pathname: `/edit-hospital`,
              query: { test: "test" },
            }}
          >
            Edit
          </Link>

          {/* <Popconfirm
          title= "Sure to delete?"
          onConfirm={() => handleRemove(record.id, record.is_active)}
        >
          <a style={{color: 'red', marginLeft: 15}}>Delete</a>
        </Popconfirm> */}
        </div>
      ),
    },
  ];

  const searchUserSuperUser = async (username) => {
    console.log("searched user usper", username);
    let params = {
      username: username,
    };
    let success = await handlers.searchUserSuperuser(params);

    if (success.data.user_id) {
      history.push(`/user-details/${success.data.user_id}`);
      window.location.reload();
    }

    if (success) {
      localStorage.setItem("searched_user_details", JSON.stringify(success.data));
    }
  };

  const userReportsData = async (localToken1) => {
    let userReports = {};
    if (localToken1) {
      userReports = await handlers.fetchHospitalList(localToken1, userIdLocal);
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
        background: `url(${Background})`,
        backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat'
      }}
    >
   

      <Row style={{width: '100%'}}>

<span 
 style={{fontSize: 50, fontWeight: 'bold', alignContent: 'flex-start', float: 'left', color: '#D3ECF9'
}}>  DASHBOARD </span>
 <span style={{float: 'right'}}>
  {" "}
  <img src={logo} alt="Logo" width="100"  />  <br/><span style={{fontWeight: 'bold'}}>SUPER USER</span>

</span>  

</Row>

<span style={{ width: '100%',float: 'right', alignContent: 'flex-end', textAlign:'right', marginTop: 10, textDecoration: 'underline'}}>
<Link  onClick={clickLogout} style={{color: '#D3ECF9'}}>
          Logout
        </Link>
        </span>
   

<br />
             
              <Row style={{width: '100%'}}>

<span  style={{
  color: "white",
  fontSize: "28px",
  fontWeight: "bold",
  float: 'left',
  paddingLeft: '14%'
}}>  {patients ? patients : '--'} </span>
 <span  style={{
  color: "white",
  fontSize: "28px",
  fontWeight: "bold",
}}>  {hosp_active} ({hosp_disabled}) </span>  
<span  style={{
  color: "white",
  fontSize: "28px",
  fontWeight: "bold",
  float: 'right',
  paddingRight: '11%'
}}>  {clinic_active} ({clinic_disabled})</span>
</Row>

              <Row style={{width: '100%', color: '#D3ECF9'}}>

                <span  style={{
                  // color: "#1b62ab",
                  fontSize: "20px",
                  fontWeight: "bold",
                  float: 'left',
                  paddingLeft: '10%'
                }}>  PATIENTS </span>
                 <span  style={{
                  // color: "#1b62ab",
                  fontSize: "20px",
                  fontWeight: "bold",             
                }}>  HOSPITALS </span>  
                <span  style={{
                  // color: "#1b62ab",
                  fontSize: "20px",
                  fontWeight: "bold",
                  float: 'right',
                  paddingRight: '10%'
                }}>  CLINICS </span>
        </Row>
    
    <br/>

      {showSearchPatient && (
        <React.Fragment>
          <Formik
            initialValues={{}}
            onSubmit={async (values, formikBag) => {
              console.log("values in search", values);
              values.localToken = localToken1;
              let success = await handlers.searchUser(values, formikBag);
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
                    padding: 30,
                    border: "2px solid grey",
                    backgroundColor: "white",
                  }}
                >
                  <Form className="formik-form">
                    <div className="col">
                      <h3 className="form-group-label">Search Patient</h3>

                      <div className="form-group-field custom-input with-extention">
                        <Field
                          name="username"
                          component={FormikMaterialTextField}
                          placeholder="Enter phone number"
                        />
                      </div>
                    </div>
                    <br />
                    <div className="btn-wrapper">
                      <Button
                        type="button"
                        onClick={() => searchUserSuperUser(values.username)}
                      >
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
             

              <Row>

                <span  style={{
                  // color: "#1b62ab",
                  fontSize: "30px",
                  fontWeight: "bold",
                  // marginTop: "20px",
                  color: '#D3ECF9',
                  float: 'left'
                }}>  List of Health Centers </span>
                <span style={{float: 'right'}}>
          <a href={`/add-hospital`}>
            <button type="button" class="btn btn-success btn-sm">
              Add New Health Center
            </button>
          </a>

          <a>
            <button
              type="button"
              onClick={() => setShowSearchPatient(!showSearchPatient)}
              style={{ marginLeft: 10 }}
              class="btn btn-success btn-sm"
            >
              Search Patient
            </button>
          </a>
          </span>
        </Row>
        <br />
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
