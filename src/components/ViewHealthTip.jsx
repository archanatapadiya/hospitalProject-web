import React, { useState, useEffect } from "react";
import * as handlers from "./handlers";
import _ from "lodash";
import Background from "../components/images/background.jpeg";
import "antd/dist/antd.css";
import NameAndLogo from "./NameAndLogo";
import ArrowIcon from "mdi-react/ArrowBackIcon";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TimePicker } from "material-ui";
import ReadMoreReact from 'read-more-react';
import ReactReadMoreReadLess from "react-read-more-read-less";
import "./styles.css";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function ViewHealthTip() {
  const [localToken1, setLocalToken1] = useState(localStorage.getItem("token"));
  const isSuperuser = localStorage.getItem("isSuperuser");
  const [healthData, setHealthData] = useState({});

  const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

  useEffect(() => {
    const localTokenCalled = localStorage.getItem("token");
    if (localTokenCalled != null) {
      setLocalToken1(localTokenCalled);
    }
    if (localTokenCalled == null) {
      window.location.reload();
    }
  }, [localToken1]);

  const userReportsData = async () => {
    let healthTip = {};
    if (localToken1) {
      healthTip = await handlers.fetchHealthTip();
    }
    setHealthData(healthTip?.data)
    let healthTipData = healthTip?.response_message;

    return healthTipData;
  };

  const handleDelete = async (id) => {
    const healthTipDelete = await handlers.deleteHealthTip(id);
    const userReports = userReportsData(localToken1);
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

      <h2 style={{ color: "#D3ECF9" }}>Health Tip</h2>

      {healthData && Array.isArray(healthData) && (
      healthData.map((tip, i) => (
      <Card sx={{ width: 550, marginTop: 2}}>
         
        <CardContent>
          <Typography variant="h5" component="div">
            {tip.title}
          </Typography>

          <ReactReadMoreReadLess
        charLimit={200}
        readMoreText={"Read more ▼"}
        readLessText={"Read less ▲"}
        readMoreClassName="read-more-less--more"
        readLessClassName="read-more-less--less"
      >
        {tip.description}
      </ReactReadMoreReadLess>
        </CardContent>
        <CardActions>
        <Popup trigger={<Button size="small">Delete</Button>} position="right center">
    <div><span style={{cursor: 'pointer'}} onClick={()=> handleDelete(tip.id)}>Sure to delete?</span> </div>

  </Popup>
          {/* <Button size="small" onClick={()=> handleDelete(tip.id)}>Delete</Button> */}
        </CardActions>
      </Card>
      )))}
    </div>
  );
}

export default ViewHealthTip;