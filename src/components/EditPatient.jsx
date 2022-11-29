import React, { Component } from 'react';
import axios from 'axios';
import history from './lib/history';
import { Link, useParams } from 'react-router-dom';
import Notification from "rc-notification";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import ArrowIcon from 'mdi-react/ArrowBackIcon';
import Background from '../components/images/background.jpeg';
import NameAndLogo from './NameAndLogo';

class App extends Component {

  state = {
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    address: "",
    zip_code: "",
    blood_pressure: null,
    blood_group: null,
    height: null,
    weight: null,
    bmi: null,
    pulse: null,
    health_id: null
  };

  componentWillMount() {
    let user_details = JSON.parse(localStorage.getItem('searched_user_data'));
    this.setState({

      first_name: user_details.first_name,
      last_name: user_details.last_name,
      email: user_details.email,
      phone_number: user_details.phone_number,
      address: user_details.address,
      zip_code: user_details.zip_code,
      blood_pressure: user_details.blood_pressure,
      blood_group: user_details.blood_group,
      height: user_details.height,
      weight: user_details.weight,
      bmi: user_details.bmi,
      pulse: user_details.pulse,
      health_id: user_details.health_id

    });

  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  };


  handleSubmit = (e) => {

    e.preventDefault();
    console.log(this.state);
    const localToken = localStorage.getItem('token');


    const userData = localStorage.getItem('user_data');
    const userData_parsed = JSON.parse(userData);

    const hospitalId = localStorage.getItem('hospital_id');
    const isSuperuser = localStorage.getItem("isSuperuser");

    let form = new FormData();

    form.append('firstname', this.state.first_name);
    form.append('lastname', this.state.last_name);
    form.append('phone_number', this.state.phone_number);
    form.append('email', this.state.email);
    form.append('address', this.state.address);
    form.append('zip_code', this.state.zip_code);
    form.append('health_id', this.state.health_id);
    form.append('blood_pressure', this.state.blood_pressure);
    form.append('blood_group', this.state.blood_group);
    form.append('height', this.state.height);
    form.append('weight', this.state.weight);

    // form.append('bmi', this.state.bmi);
    form.append('pulse', this.state.pulse);
    form.append('hospital_id', hospitalId);
    form.append('user_id', userData_parsed?.user_id);


    let url = 'http://43.205.89.142/update_user_profile/';
    axios.post(url, form, {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: localToken,
      }
    })
      .then(res => {
        history.push(isSuperuser == "true" ? `/user-details/${userData_parsed.user_id}` : `/upload-details/${userData_parsed.user_id}`);
        window.location.reload();
        console.log(res.data);
      })
      // .catch(res => {console.log(res)})

      .catch(function (error) {
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          alert(error.response.data.response_message);

        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }

      });
  };

  render() {
    const userData = localStorage.getItem('user_data');
    const userData_parsed = JSON.parse(userData);
    const isSuperuser = localStorage.getItem("isSuperuser");

    return (
      <div className="login-wrapper" style={{
        boxShadow: '0px 0px 10px #0000001a',
        border: '1px solid #c9c9c9',
        padding: 50,
        marginLeft: 300,
        marginRight: 300,
        marginTop: 50,
        backgroundColor: '#F7FBF9',
        opacity: 1,
        background: `url(${Background})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}>

        <NameAndLogo />
        <a href={isSuperuser == "true" ? `/user-details/${userData_parsed.user_id}` : `/upload-details/${userData_parsed.user_id}`} style={{ marginLeft: '-95%', color: '#D3ECF9' }}>
          <ArrowIcon />
        </a>

        <h2 style={{ color: '#D3ECF9' }}>Edit Patient Details</h2>

        <div  >
          <form onSubmit={this.handleSubmit} style={{ backgroundColor: 'white', border: '2px solid grey', marginTop: '20px', padding: '30px', width: 400 }}>
            <div className="col">
              <h3 className="form-group-label">First Name*</h3>

              <p>
                <input style={{ width: 200 }} type="name" id='first_name' value={this.state.first_name} onChange={this.handleChange} required />
              </p>
            </div>

            <div className="col">
              <h3 className="form-group-label">Last Name*</h3>

              <p>
                <input style={{ width: 200 }} type="name" id='last_name' value={this.state.last_name} onChange={this.handleChange} required />
              </p>
            </div>

            <div className="col">
              <h3 className="form-group-label">Email*</h3>

              <p>
                <input style={{ width: 200 }} type="email" id='email' value={this.state.email} onChange={this.handleChange} required />
              </p>
            </div>

            <div className="col">
              <h3 className="form-group-label">Phone Number*</h3>

              <p>
                <input style={{ width: 200 }} disabled={true} type="phone_number" id='phone_number' value={this.state.phone_number} onChange={this.handleChange} required />
              </p>
            </div>
            <div className="col">
              <h3 className="form-group-label">Address*</h3>
              <p>
                <input style={{ width: 200 }} type="address" id='address' value={this.state.address} onChange={this.handleChange} required />
              </p>
            </div>

            <div className="col">
              <h3 className="form-group-label">Zip Code*</h3>

              <p>
                <input style={{ width: 200 }} type="zip_code" id='zip_code' value={this.state.zip_code} onChange={this.handleChange} required />
              </p>
            </div>


            <div className="col">
              <h3 className="form-group-label" style={{ fontWeight: 'bold', textDecoration: 'underline' }}>HEALTH DETAILS</h3>
            </div>

            <div className="col">
              <h3 className="form-group-label">Health Id</h3>

              <p>
                <input style={{ width: 200 }} type="health_id" id='health_id' value={this.state.health_id} onChange={this.handleChange} />
              </p>
            </div>

            <div className="col">
              <h3 className="form-group-label">Blood Group</h3>

              <p>
                <input style={{ width: 200 }} type="blood_group" id='blood_group' value={this.state.blood_group} onChange={this.handleChange} />
              </p>
            </div>

            <div className="col">
              <h3 className="form-group-label">Blood Pressure</h3>

              <p>
                <input style={{ width: 200 }} type="blood_pressure" id='blood_pressure' value={this.state.blood_pressure} onChange={this.handleChange} />
              </p>
            </div>

            <div className="col">
              <h3 className="form-group-label">Height (cm)</h3>

              <p>
                <input style={{ width: 200 }} type="height" id='height' value={this.state.height} onChange={this.handleChange} />
              </p>
            </div>

            <div className="col">
              <h3 className="form-group-label">Weight (kg)</h3>

              <p>
                <input style={{ width: 200 }} type="weight" id='weight' value={this.state.weight} onChange={this.handleChange} />
              </p>
            </div>

            {/* <div className="col">
              <h3 className="form-group-label">BMI</h3>

              <p>
                <input style={{width: 200}} type="bmi" id='bmi' value={this.state.bmi} onChange={this.handleChange}  />
              </p>
            </div> */}

            <div className="col">
              <h3 className="form-group-label">Pulse</h3>

              <p>
                <input style={{ width: 200 }} type="pulse" id='pulse' value={this.state.pulse} onChange={this.handleChange} />
              </p>
            </div>

            <br />
            <input type="submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default App;

