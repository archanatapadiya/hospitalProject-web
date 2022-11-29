import React, { useState, useEffect, Component } from "react";
import axios from "axios";
import history from "./lib/history";
import "react-datepicker/dist/react-datepicker.css";
import Background from "../components/images/background.jpeg";
import NameAndLogo from "./NameAndLogo";
import ArrowIcon from "mdi-react/ArrowBackIcon";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

class App extends Component {
  state = {
    name: "",
    id: "",
    reportLimit: null,
    reportPrice: null,
  };

  componentWillMount() {
    let plan_details = JSON.parse(localStorage.getItem("editIndividualPlan"));
    this.setState({
      name: plan_details.name,
      id: plan_details.id,
      reportLimit: plan_details.report_limit,
      reportPrice: plan_details.report_price,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const localToken = localStorage.getItem("token");
    const userId = localStorage.getItem("user_id");

    let bodyparams = {
      user_id: userId,
      id: this.state.id,
      report_limit: this.state.reportLimit,
      report_price: this.state.reportPrice,
      name: null,
    };

    return fetch(`http://43.205.89.142/user_space_edit/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localToken,
      },
      body: JSON.stringify(bodyparams),
    }).then((res) => {
      history.push(`/view-plans`);
      window.location.reload();
      console.log(res.data);
    });
  };

  render() {
    const isSuperuser = localStorage.getItem("isSuperuser");

    return (
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
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <NameAndLogo />

        <a
          href={isSuperuser == "true" ? `/view-plans` : `/`}
          style={{ marginLeft: "-95%", color: "#D3ECF9" }}
        >
          <ArrowIcon />
        </a>
        <form
          onSubmit={this.handleSubmit}
          style={{
            backgroundColor: "white",
            border: "2px solid grey",
            marginTop: "20px",
            padding: "30px",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              border: "2px solid black",
              marginTop: "20px",
              padding: "30px",
              // width: "70%",
            }}
          >
            <div className="col">
              <h3
                className="form-group-label"
                style={{ fontWeight: "bolder", textDecoration: "underline" }}
              >
                Edit Plan For
              </h3>

              <RadioGroup
                aria-label="plan"
                defaultValue="1"
                name="row-radio-buttons-group"
                value={this.state.selection}
              >
                <div style={{ display: "flex" }}>
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="Individual"
                  />
                </div>
              </RadioGroup>
            </div>

            <div className="col">
              <h3
                className="form-group-label"
                style={{ fontWeight: "bolder", textDecoration: "underline" }}
              >
                Edit For Individual
              </h3>

              <RadioGroup
                aria-label="plan"
                defaultValue="1"
                name="row-radio-buttons-group"
                // value={this.state.hospital_type}
                // onChange={this.handleHospiTypeChange}
              >
                <div style={{ display: "flex" }}>
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="Documents"
                  />

                  <span
                    style={{
                      width: "100%",
                      float: "right",
                      alignContent: "flex-end",
                      textAlign: "right",
                      textDecoration: "underline",
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Set Limit"
                      style={{ width: 100 }}
                      value={this.state.reportLimit}
                      onChange={(e) =>
                        this.setState({ reportLimit: Number(e.target.value) })
                      }
                    />

                    <input
                      type="text"
                      placeholder="Set Price"
                      style={{ width: 100, marginLeft: 20 }}
                      value={this.state.reportPrice}
                      onChange={(e) =>
                        this.setState({ reportPrice: Number(e.target.value) })
                      }
                    />
                  </span>
                </div>
              </RadioGroup>
            </div>

            <br />
            <input type="submit" />
          </div>
        </form>
      </div>
    );
  }
}

export default App;
