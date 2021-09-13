import React, { Component } from 'react';
import axios from 'axios';
import history from './lib/history';
import { Link, useParams } from 'react-router-dom';
import Notification from "rc-notification";


class App extends Component {

  state = {
    name: '',
    phone_number: '',
    logo: null,
    email: '',
  password: '',
  registration_no: '',
  contact_number: '',
address: '',

description: '',
// image: null,
zip_code: ''
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  };

  handleLogoChange = (e) => {
    this.setState({
      logo: e.target.files[0]
    })
  };

  // handleImageChange = (e) => {
  //   this.setState({
  //     image: e.target.files[0]
  //   })
  // };



  handleSubmit = (e) => {
    
    e.preventDefault();
    console.log(this.state);
    const localToken = localStorage.getItem('token');

   
    const userData = localStorage.getItem('user_data');
    const userData_parsed = JSON.parse(userData);

    const hospitalId = localStorage.getItem('hospital_id');

    let form_data = new FormData();

    form_data.append('logo', this.state.logo, this.state.logo.name);
    form_data.append('name', this.state.name);
    form_data.append('phone_number', this.state.phone_number);
    form_data.append('email', this.state.email);
    form_data.append('password', this.state.password);
    form_data.append('registration_no', this.state.registration_no);
    form_data.append('contact_number', this.state.contact_number);
    form_data.append('address', this.state.address);
  
    form_data.append('description', this.state.description);
    // form_data.append('image', this.state.image, this.state.image.name);
    form_data.append('zip_code', this.state.zip_code);

    let url = 'http://3.109.71.28/add_hospital/';
    axios.post(url, form_data, {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: localToken,
      }
    })
        .then(res => {
          history.push(`/`);
          window.location.reload();
          console.log(res.data);
        })
        // .catch(res => {console.log(res)})

        .catch(function (error) {
          if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
           
            Notification.newInstance({}, (notification) => {
              notification.notice({
                content: (
                  <span style={{ backgroundColor: "red", top: 65, left: "50%" }}>
                    {error?.response?.data?.response_message?.registration_no ? 
                    'Registration Number -- ' + error?.response?.data?.response_message?.registration_no[0] :
                     error?.response?.data?.response_message }
                  </span>
                ),
                closable: true,
                duration: null,
              });
            });

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
    return (
      <div className="login-wrapper" style={{   boxShadow: '0px 0px 10px #0000001a',
      border: '1px solid #c9c9c9',
      padding: 50,
      marginLeft: 300,
      marginRight: 300,
      marginTop: 50,
      backgroundColor: '#F7FBF9',
      opacity: 1}}>
         <h2>Add Hospital</h2>
      
      <div  >
        <form onSubmit={this.handleSubmit} style={{backgroundColor: 'white',  border: '2px solid grey',  marginTop: '20px', padding: '30px'}}>
        <div className="col">
                <h3 className="form-group-label">Name</h3>

          <p>
            <input type="name"  id='name' value={this.state.name} onChange={this.handleChange} required/>
          </p>
          </div>

          <div className="col">
                <h3 className="form-group-label">Phone Number</h3>

          <p>
            <input type="phone_number"  id='phone_number' value={this.state.phone_number} onChange={this.handleChange} required/>
          </p>
          </div>

          <div className="col">
                <h3 className="form-group-label">Email</h3>

          <p>
            <input type="email"  id='email' value={this.state.email} onChange={this.handleChange} required/>
          </p>
          </div>

          <div className="col">
                <h3 className="form-group-label">Password</h3>

          <p>
            <input type="password"  id='password' value={this.state.password} onChange={this.handleChange} required/>
          </p>
          </div>

       <div className="col">
                <h3 className="form-group-label">Registration Number</h3>

          <p>
            <input type="registration_no"  id='registration_no' value={this.state.registration_no} onChange={this.handleChange} required/>
          </p>
          </div>

          {/* <div className="col">
                <h3 className="form-group-label">Contact Number</h3>

          <p>
            <input type="contact_number"  id='contact_number' value={this.state.contact_number} onChange={this.handleChange} required/>
          </p>
          </div> */}

          <div className="col">
                <h3 className="form-group-label">Address</h3>

          <p>
            <input type="address"  id='address' value={this.state.address} onChange={this.handleChange} required/>
          </p>
          </div>

          <div className="col">
                <h3 className="form-group-label">Zip Code</h3>

          <p>
            <input type="zip_code"  id='zip_code' value={this.state.zip_code} onChange={this.handleChange} required/>
          </p>
          </div>


          <div className="col">
                <h3 className="form-group-label">Description</h3>

          <p>
            <input type="description"  id='description' value={this.state.description} onChange={this.handleChange} required/>
          </p>
          </div>

      


          <div className="col">
                <h3 className="form-group-label">Upload Logo</h3>
          <p style={{marginLeft: '80px'}}>
            <input type="file"
                   id="logo"
                   accept="image/png, image/jpeg"  onChange={this.handleLogoChange} required />
          </p>
          </div>

          {/* <div className="col">
                <h3 className="form-group-label">Upload Image</h3>
          <p style={{marginLeft: '80px'}}>
            <input type="file"
                   id="image"
                   accept="image/png, image/jpeg"  onChange={this.handleImageChange} required/>
          </p>
          </div> */}

          <input type="submit"/>
        </form>
      </div>
     </div>
    );
  }
}

export default App;
