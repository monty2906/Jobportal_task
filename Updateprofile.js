import React, { Component } from 'react';
import './Profile.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Homefooter from './Homefooter';
import Profilenavbar from './Profilenavbar';
import swal from 'sweetalert';

export default class Updateprofile extends Component{
    constructor(props) {
        super(props);
        const token = localStorage.getItem("token");
        let loggedIn = true
        if(token==null){
            loggedIn=false
        }
        this.state = {
            currentStep: 1,
            user_full_name:'',
            user_email:'',
            contact_number:'',     
            alternative_number:'',      
            address_one:'',
            address_two:'',
            user_city:'',
            user_state:'',
            user_zipcode:'',
            graduation_year:'',
            graduation_course:'',
            graduation_branch:'',
            college_name:'',
            graduation_percent:'',
            college_city:'',
            user_skills:'',
            user_experience:'',
            profiledata1:[],  
            showall: [],
            fields: {},
            errors: {},
            loggedIn
        }
    }

    componentDidMount(){
        const user_mail = localStorage.getItem("user_email")
        axios.post('http://localhost/react_task/showprofile.php', {
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_email:user_mail
            })
        }).then((res1) => {
            var profiledata=res1.data
            this.setState({
              profiledata1:profiledata
            });
        })
      }

      handleChange = (e) => {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
          errors:'',
          fields
        });
      }  

    //validation function
     validateForm() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
  
        if (!fields["user_name"]) {
            formIsValid = false;
            errors["user_name"] = "*Enter Name.";
          }
        if (!fields["user_email"]) {
          formIsValid = false;
          errors["user_email"] = "*Enter email-ID";
        }
        if (typeof fields["user_email"] !== "undefined") {
          var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
          if (!pattern.test(fields["user_email"])) {
            formIsValid = false;
            errors["user_email"] = "*Enter valid email";
          }
        }

        if (!fields["password"]) {
          formIsValid = false;
          errors["password"] = "*Enter password.";
        }
        this.setState({
          errors: errors
        });
        return formIsValid;
      }

      handleSubmit = (event) => {
            const user_mail = localStorage.getItem("user_email")
            const FinalValues = {
                user_full_name:this.state.user_full_name,
                user_email:user_mail,
                contact_number:this.state.contact_number,     
                alternative_number:this.state.alternative_number,      
                address_one:this.state.address_one,
                address_two:this.state.address_two,
                user_city:this.state.user_city,
                user_state:this.state.user_state,
                user_zipcode:this.state.user_zipcode,
                graduation_year:this.state.graduation_year,
                graduation_course:this.state.graduation_course,
                graduation_branch:this.state.graduation_branch,
                college_name:this.state.college_name,
                graduation_percent:this.state.graduation_percent,
                college_city:this.state.college_city,
                user_skills:this.state.user_skills,
                user_experience:this.state.user_experience
              }
            var body = JSON.stringify(FinalValues)
            axios.post('http://localhost/react_task/details.php', body, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res)=>{
                swal("Profile Updated");
            }) 
        }

        _next = () => {
            let currentStep = this.state.currentStep
            currentStep = currentStep >= 2? 3: currentStep + 1
            this.setState({
              currentStep: currentStep
            })
          }   
          _prev = () => {
            let currentStep = this.state.currentStep
            currentStep = currentStep <= 1? 1: currentStep - 1
            this.setState({
              currentStep: currentStep
            })
          }
          previousButton() {
            let currentStep = this.state.currentStep;
            if(currentStep !==1){
              return (
                <button 
                  className="btn btn-secondary pre_button"
                  type="button" onClick={this._prev}>
                Previous
                </button>
              )
            }
            return null;
          }     
          nextButton(){
            let currentStep = this.state.currentStep;
            if(currentStep <2){
              return (
               <center> <button 
                  className="btn btn-primary nextbutton" 
                  type="button" onClick={this._next}>
                Next
                </button>   </center>     
              )
            }
            return null;
          }


    render(){
        if(this.state.loggedIn===false){
			return <Redirect to="/slogin" />
		} 
        return(
            <div>
                <Profilenavbar />
                <section id="bottom-section" className="text-center">
                  <h1><b>UPDATE PROFILE</b></h1>
              </section>
                <React.Fragment>
                    {this.state.profiledata1.map((alldata) => {
                      return (
                        <div className="container">
                            <center><h3>Step {this.state.currentStep}</h3></center>
                            <form onSubmit={this.handleSubmit}>
                                <Step1
                                    currentStep={this.state.currentStep} 
                                    handleChange={this.handleChange}
                                    user_full_name = {alldata.user_full_name}
                                    user_email = {alldata.user_email}
                                    contact_number = {alldata.contact_number}
                                    alternative_number = {alldata.alternative_number}
                                    address_one = {alldata.address_one}
                                    address_two = {alldata.address_two}
                                    user_city = {alldata.user_city}
                                    user_state = {alldata.user_state}
                                    user_zipcode = {alldata.user_zipcode}
                                />
                                <Step2 
                                    currentStep={this.state.currentStep} 
                                    handleChange={this.handleChange}
                                    graduation_year = {alldata.graduation_year}
                                    graduation_course = {alldata.graduation_course}
                                    graduation_branch = {alldata.graduation_branch}
                                    college_name = {alldata.college_name}
                                    graduation_percent = {alldata.graduation_percent}
                                    college_city = {alldata.college_city}
                                    user_skills = {alldata.user_skills}
                                    user_experience = {alldata.user_experience}
                                />
                                {this.previousButton()}
                                {this.nextButton()}
                            </form>
                        </div>  
                      );   
                    })}
                </React.Fragment>
                <Homefooter />
            </div>
        );
    }
}

function Step1(props) {
    if (props.currentStep !== 1) {
      return null
    } 
    return(
        <div className="container">
        <div className="myform">
        <div className="form-row">
            <div className="form-group col-md-6">
            <label htmlFor="input"><b>Full Name</b></label><font color="red" size="3">*</font>
            <input type="text" className="form-control" id="input" placeholder="Name" 
                   name="user_full_name" defaultValue={props.user_full_name}
                   onChange={props.handleChange}
            />
            </div>
            <div className="form-group col-md-6">
            <label htmlFor="input">Email</label><font color="red" size="3">*</font>
            <input type="email" className="form-control" id="input" placeholder="Email"
                   name="user_email" defaultValue={props.user_email}
                   onChange={props.handleChange} 
                  errorText={props.errors} disabled
            />
            <font color="red" size="10">{props.errors}</font>
            </div>
            <div className="form-group col-md-6">
            <label htmlFor="input">Contact Number</label>
            <input type="text" className="form-control" id="input" placeholder="Contact Number"
                   name="contact_number" defaultValue={props.contact_number}
                   onChange={props.handleChange}
            />
            </div>
            <div className="form-group col-md-6">
            <label htmlFor="input">Alternative Number</label>
            <input type="text" className="form-control" id="input" placeholder="Alternative Number"
                    name="alternative_number" defaultValue={props.alternative_number}
                    onChange={props.handleChange}
             />
            </div>
        </div>
        <div className="form-group">
            <label htmlFor="input">Address</label>
            <input type="text" className="form-control" id="input" placeholder="1234 Main St"
                    name="address_one" defaultValue={props.address_one}
                    onChange={props.handleChange}
             />
        </div>
        <div className="form-group">
            <label htmlFor="input">Address 2</label>
            <input type="text" className="form-control" id="input" placeholder="Apartment, studio, or floor"
                    name="address_two" defaultValue={props.address_two}
                    onChange={props.handleChange}
             />
        </div>
        <div className="form-row">
            <div className="form-group col-md-6">
            <label htmlFor="inputCity">City</label>
            <input type="text" className="form-control" id="input" placeholder="City"
                    name="user_city" defaultValue={props.user_city}
                    onChange={props.handleChange}
             />
            </div>
            <div className="form-group col-md-4">
            <label htmlFor="inputState">State</label>
            <input type="text" className="form-control" id="input" placeholder="State"
                    name="user_state" defaultValue={props.user_state}
                    onChange={props.handleChange} 
             />
            </div>
            <div className="form-group col-md-2">
            <label htmlFor="inputZip">Zip</label>
            <input type="text" className ="form-control" id="input" placeholder="zip code"
                    name="user_zipcode" defaultValue={props.user_zipcode}
                    onChange={props.handleChange}
             />
            </div>
        </div>
      </div>
      </div>
    );
  }
  
  function Step2(props) {
    if (props.currentStep !== 2) {
      return null
    } 
    return(
        <div className="container">
        <div className="myform">
        <div className="form-row">
            <div className="form-group col-md-6">
            <label htmlFor="inputEmail4">Graduation Year</label><font color="red" size="3">*</font>
            <input type="text" className="form-control" id="input" placeholder="Graduation Year"
                    name="graduation_year" defaultValue={props.graduation_year}
                    onChange={props.handleChange}
             />
            </div>
            <div className="form-group col-md-6">
            <label htmlFor="inputPassword4">Course</label><font color="red" size="3">*</font>
            <input type="text" className="form-control" id="input" placeholder="Course"
                    name="graduation_course" defaultValue={props.graduation_course}
                    onChange={props.handleChange}
             />
            </div>
        </div>
        <div className="form-group">
            <label htmlFor="inputAddress">Branch</label>
            <input type="text" className="form-control" id="input" placeholder="Branch"
                    name="graduation_branch" defaultValue={props.graduation_branch}
                    onChange={props.handleChange} 
             />
        </div>
        <div className="form-group">
            <label htmlFor="inputAddress2">College Name</label>
            <input type="text" className="form-control" id="input" placeholder="College Name"
                    name="college_name" defaultValue={props.college_name}
                    onChange={props.handleChange}
             />
        </div>
        <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputCity">Percent</label>
              <input type="text" className="form-control" id="input" placeholder="Percent"
                      name="graduation_percent" defaultValue={props.graduation_percent}
                      onChange={props.handleChange} 
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputZip">College City</label>
              <input type="text" className ="form-control" id="input" placeholder="College City"
                      name="college_city" defaultValue={props.college_city}
                      onChange={props.handleChange}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputAddress2">Skills</label>
              <input type="text" className="form-control" id="input" placeholder="Skills"
                      name="user_skills" defaultValue={props.user_skills}
                      onChange={props.handleChange}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="experience">Experience</label>
              <input type="text" className="form-control" id="input" placeholder="Experience"
                      name="user_experience" defaultValue={props.user_experience}
                      onChange={props.handleChange}
              />
            </div>
        </div>
        <button className="btn btn-success btn-block sub_button" onClick={props.handleSubmit}>Submit</button>
      </div>
      </div>
    );
  }