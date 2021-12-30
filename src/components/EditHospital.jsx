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

class App extends Component {

  state = {
  name: '',
  phone_number: '',
  logo: null,
  email: '',
  password: '',
  registration_no: '',
  hospital_type:'1',
  contact_number: '',
  address: '',
  description: '',
  zip_code: '',
  id: '',
  removeImage: false
  };

  componentWillMount() {
    let hosp_details = JSON.parse(localStorage.getItem('editHospital'));
        this.setState({
        name: hosp_details.name,
        phone_number: hosp_details.phone_number,
        email: hosp_details.email,
        hospital_type: hosp_details.hospital_type,
        address: hosp_details.address,
        zip_code: hosp_details.zip_code,
        description: hosp_details.description,
        id: hosp_details.id,
        registration_no: hosp_details.registration_no,
        // logo: URL.createObjectURL(hosp_details.logo) 
       });
    
 }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  };

  handleLogoChange = (e) => {
    console.log('logo-->', e)

    this.setState({
      logo: e.target.files[0]
    })
  };

   handleHospiTypeChange = (e) => {
    this.setState({
      hospital_type: e.target.value
    })  };


  handleSubmit = (e) => {
    
    e.preventDefault();
    console.log(this.state);
    const localToken = localStorage.getItem('token');

   
    const userData = localStorage.getItem('user_data');
    const userData_parsed = JSON.parse(userData);

    const hospitalId = localStorage.getItem('hospital_id');
 
    let form_data = new FormData();

    if(this.state.logo){
    form_data.append('logo', this.state.logo, this.state.logo.name);
    }
    form_data.append('name', this.state.name);
    form_data.append('phone_number', this.state.phone_number);
    form_data.append('email', this.state.email);
    form_data.append('password', this.state.password);
    form_data.append('registration_no', this.state.registration_no);
    form_data.append('hospital_type', this.state.hospital_type);
    form_data.append('contact_number', this.state.contact_number);
    form_data.append('address', this.state.address);  
    form_data.append('description', this.state.description);
    form_data.append('zip_code', this.state.zip_code);
    form_data.append('hospital_id', this.state.id);

    let url = 'http://3.110.35.199/hospital_details/';
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
            alert(error.response.data.response_message);
           
            // Notification.newInstance({}, (notification) => {
            //   notification.notice({
            //     content: (
            //       <span style={{ backgroundColor: "red", top: 65, left: "50%" }}>
            //         {error?.response?.data?.response_message?.registration_no ? 
            //         'Registration Number -- ' + error?.response?.data?.response_message?.registration_no[0] :
            //          error?.response?.data?.response_message }
            //       </span>
            //     ),
            //     closable: true,
            //     duration: null,
            //   });
            // });

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
    let logo_details = JSON.parse(localStorage.getItem('editHospital'));
if(logo_details){
    var str = logo_details?.logo;
str = str?.substring(str.indexOf("://") + 3);
str = str?.substring(str.indexOf("/") + 1);

console.log('str', str)
}

    return (
      <div className="login-wrapper" style={{   boxShadow: '0px 0px 10px #0000001a',
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
  backgroundRepeat: 'no-repeat'}}>

        <a href={`/superuser-login`} style={{marginLeft: '-95%', color: '#D3ECF9'}}>     
          <ArrowIcon /> 
        </a>

         <h2 style={{color: '#D3ECF9'}}>Edit Health Center</h2>
      
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
            <input disabled = {true} type="email"  id='email' value={this.state.email} onChange={this.handleChange} required/>
          </p>
          </div>


       <div className="col">
                <h3 className="form-group-label">Registration Number</h3>

          <p>
          <input disabled = {true} type="registration_no"  id='registration_no' value={this.state.registration_no} onChange={this.handleChange} required/>
          </p>
          </div>

          <div className="col">
                <h3 className="form-group-label">Health Center Type</h3>

                <FormControl component="fieldset">
      {/* <FormLabel component="legend">Please select type of patient</FormLabel> */}
      <RadioGroup row aria-label="gender" defaultValue="1" name="row-radio-buttons-group" 
      value={this.state.hospital_type}
        onChange={this.handleHospiTypeChange}>
        <FormControlLabel value="1" control={<Radio />} label="OPD" />
        <FormControlLabel value="2" control={<Radio />} label="IPD" />
        <FormControlLabel value="3" control={<Radio />} label="OPD / IPD" />
      </RadioGroup>
    </FormControl>

          </div>       
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

                {(!this.state.removeImage && logo_details.logo)? 
                <div>
                  <a href={logo_details.logo}>{str}</a>
{logo_details.logo ? <img width= '50px' src ={logo_details.logo}/> : null}

<br />
<button style={{marginTop: 10}} onClick={() =>  this.setState({
      removeImage: true
    }) }>Remove image and add a new image</button>
<br />
</div> :

          <p style={{marginLeft: '80px', marginTop: 20}}>
            <input type="file"
                   id="logo"
                   accept="image/png, image/jpeg"  onChange={this.handleLogoChange}  />
          </p>
  }
          </div>
          <br />
          <input type="submit"/>
        </form>
      </div>
     </div>
    );
  }
}

export default App;

