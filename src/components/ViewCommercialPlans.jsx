import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as handlers from "./handlers";
import history from "./lib/history";
import "react-datepicker/dist/react-datepicker.css";
import Background from "../components/images/background.jpeg";
import NameAndLogo from "./NameAndLogo";
import ArrowIcon from "mdi-react/ArrowBackIcon";
import { Table, Popconfirm } from "antd";

function AddHealthTip() {
  const isSuperuser = localStorage.getItem("isSuperuser");
  const [hospPlans, setHospPlans] = useState();
  const [indiPlans, setIndiPlans] = useState();

  const viewHospitalPlans = async () => {
    const hospitalPlans = await handlers.viewHospitalPlan();
    console.log("hospitalPlans", hospitalPlans);
    setHospPlans(hospitalPlans?.data);
    let hospiPlans = hospitalPlans?.data;
    return hospiPlans;
  };

  const viewIndividualPlans = async () => {
    const individualPlans = await handlers.viewIndividualPlan();
    console.log("individualPlans", individualPlans);
    setIndiPlans(individualPlans?.data);
    let indiPlans = individualPlans?.data;
    return indiPlans;
  };

  const handleHospitalDelete = async (id, is_active) => {
    try {
      let params = {
        id: id,
        is_active: !is_active,
      };
      let res = await handlers.disableHospitalPlan(params);
      if (res.is_success == true) {
        window.location.reload();
      }
      console.log("ConfirmDeleteModal-->handleConfirmErr---->");
    } catch (err) {
      console.log("ConfirmDeleteModal-->handleConfirmErr---->", err);
    }
  };

  const handleIndividualDelete = async (id, is_active) => {
    try {
      let params = {
        id: id,
        is_active: !is_active,
      };
      let res = await handlers.disableIndividualPlan(params);
      if (res.is_success == true) {
        window.location.reload();
      }
      console.log("ConfirmDeleteModal-->handleConfirmErr---->");
    } catch (err) {
      console.log("ConfirmDeleteModal-->handleConfirmErr---->", err);
    }
  };

  useEffect(() => {
    const hospitalPlan = viewHospitalPlans();
    const individualPlan = viewIndividualPlans();
  }, []);

  const PLANS_TABLE_HEADER = [

    {
      title: "Plan Price",
      dataIndex: "total",
      key: "total",
      // width: 150,
      render: (text, record) => {
        let value;
        if (text) {
          value = (
            <span>
              <span>&#8377;</span> {text}
            </span>
          );
        } else {
          value = "--";
        }
        return value;
      },
    },

    {
      title: "Reports",
      children: [
        {
          title: "Limit",
          dataIndex: "report_limit",
          key: "report_limit",
          render: (text) => {
            let value;
            if (text) {
              value = text;
            } else {
              value = "--";
            }
            return value;
          },
        },
        {
          title: "Price",
          dataIndex: "report_price",
          key: "report_price",
          render: (text, record) => {
            let value;
            if (text) {
              value = (
                <span>
                  <span>&#8377;</span> {text}
                </span>
              );
            } else {
              value = "--";
            }
            return value;
          },
        },
      ],
    },

    {
      title: "Health Updates",
      children: [
        {
          title: "Limit",
          dataIndex: "health_limit",
          key: "health_limit",
          render: (text) => {
            let value;
            if (text) {
              value = text;
            } else {
              value = "--";
            }
            return value;
          },
        },
        {
          title: "Price",
          dataIndex: "health_price",
          key: "health_price",
          render: (text, record) => {
            let value;
            if (text) {
              value = (
                <span>
                  <span>&#8377;</span> {text}
                </span>
              );
            } else {
              value = "--";
            }
            return value;
          },
        },
      ],
    },

    {
      title: "Bills",
      children: [
        {
          title: "Limit",
          dataIndex: "bill_limit",
          key: "bill_limit",
          render: (text) => {
            let value;
            if (text) {
              value = text;
            } else {
              value = "--";
            }
            return value;
          },
        },
        {
          title: "Price",
          dataIndex: "bill_price",
          key: "bill_price",
          render: (text, record) => {
            let value;
            if (text) {
              value = (
                <span>
                  <span>&#8377;</span> {text}
                </span>
              );
            } else {
              value = "--";
            }
            return value;
          },
        },
      ],
    },

    {
      title: "Operation",
      dataIndex: "operation",
      render: (text, record) => (
        <div>
          <Popconfirm
            title={record.is_active ? "Sure to disable?" : "Sure to enable?"}
            onConfirm={() => handleHospitalDelete(record.id, record.is_active)}
          >
            <a
              style={!record.is_active ? { color: "red" } : { color: "green" }}
            >
              {record.is_active ? "Disable" : "Enable"}
            </a>
          </Popconfirm>

{record.edit && (
          <Link
            onClick={() =>
              localStorage.setItem("editPlan", JSON.stringify(record))
            }
            style={{ marginLeft: 15 }}
            to={{
              pathname: `/edit-plans`,
              query: { test: "test" },
            }}
          >
            Edit
          </Link>
          )}
        </div>
      ),
    },
  ];

  const INDIVIDUAL_PLANS_TABLE_HEADER = [
    {
      title: "Plan Price",
      dataIndex: "total",
      key: "total",
      render: (text, record) => {
        let value;
        if (text) {
          value = (
            <span>
              <span>&#8377;</span> {text}
            </span>
          );
        } else {
          value = "--";
        }
        return value;
      },
      // width: 150,
    },

    {
      title: "Documents",
      children: [
        {
          title: "Limit",
          dataIndex: "report_limit",
          key: "report_limit",
          render: (text) => {
            let value;
            if (text) {
              value = text;
            } else {
              value = "--";
            }
            return value;
          },
        },
        {
          title: "Price",
          dataIndex: "report_price",
          key: "report_price",
          render: (text, record) => {
            let value;
            if (text) {
              value = (
                <span>
                  <span>&#8377;</span> {text}
                </span>
              );
            } else {
              value = "--";
            }
            return value;
          },
        },
      ],
    },

    {
      title: "Operation",
      dataIndex: "operation",
      render: (text, record) => (
        <div>
          <Popconfirm
            title={record.is_active ? "Sure to disable?" : "Sure to enable?"}
            onConfirm={() =>
              handleIndividualDelete(record.id, record.is_active)
            }
          >
            <a
              style={!record.is_active ? { color: "red" } : { color: "green" }}
            >
              {record.is_active ? "Disable" : "Enable"}
            </a>
          </Popconfirm>

{record.edit && (
          <Link
            onClick={() =>
              localStorage.setItem("editIndividualPlan", JSON.stringify(record))
            }
            style={{ marginLeft: 15 }}
            to={{
              pathname: `/edit-individual-plans`,
              query: { test: "test" },
            }}
          >
            Edit
          </Link>
          )}
        </div>
      ),
    },
  ];

  return (
    <React.Fragment>
      <Formik
        initialValues={{
          title: "",
          description: "",
        }}
        onSubmit={async (values, formikBag) => {
          let success = await handlers.addHealthTip(values, formikBag);

          if (success.is_success == true) {
            alert("Health Tip added successfully");
            history.push(isSuperuser == "true" ? `/superuser-login` : `/`);
            window.location.reload();
          }
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
            <Form
              className="login-wrapper"
              style={{
                boxShadow: "0px 0px 10px #0000001a",
                border: "1px solid #c9c9c9",
                padding: 50,
                marginLeft: 350,
                marginRight: 350,
                marginTop: 50,
                backgroundColor: "#F7FBF9",
                opacity: 1,
                background: `url(${Background})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              <NameAndLogo />

              <a
                href={isSuperuser == "true" ? `/superuser-login` : `/`}
                style={{ marginLeft: "-95%", color: "#D3ECF9" }}
              >
                <ArrowIcon />
              </a>

              <h2 style={{ color: "#D3ECF9" }}>Commercial Plans</h2>

              <h3 style={{ color: "#D3ECF9" }}>Hospital Plans</h3>

              <Table
                columns={PLANS_TABLE_HEADER}
                dataSource={hospPlans}
                bordered
                pagination={false}
                style={{
                  border: "1px solid grey",
                }}
              />

              <br />
              <h3 style={{ color: "#D3ECF9" }}>Individual Plans</h3>

              <Table
                columns={INDIVIDUAL_PLANS_TABLE_HEADER}
                dataSource={indiPlans}
                bordered
                pagination={false}
                style={{
                  border: "1px solid grey",
                }}
              />
            </Form>
          );
        }}
      </Formik>
    </React.Fragment>
  );
}

export default AddHealthTip;
