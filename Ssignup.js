import React, { Component } from 'react';
import logo1 from './images/img-01.png';
import './main.css';
import Homefooter from './Homefooter';
import { Link } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';
import swal from 'sweetalert';
import { Redirect } from 'react-router-dom';

class Ssignup extends Component {
    constructor(props) {
        super(props);
        const token = localStorage.getItem("token")
        let logIn = true
        if (token == null) {
            logIn = false
        }
        this.state = {
            user_name: '',
            user_email: '',
            password: '',
            loggedIn: '',
            logIn,
            fields: {},
            errors: {}
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (e) => {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
          errors:'',
          fields
        });
    }  

    handleSubmit = (event) => {
        const user_name = this.state.fields.user_name
        const user_email = this.state.fields.user_email
        const password = this.state.fields.password
        const FinalValues = {
            user_name,
            user_email,
            password
        }
        event.preventDefault();
        if (this.validateForm()) {
            var body = JSON.stringify(FinalValues)
            localStorage.setItem("user_email", this.state.user_email)
            axios.post('http://localhost/react_task/user_first.php', body, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => {
                if (res.data === 1) {
                    swal("Your Data inserted", "", "success");
                    axios.post('http://localhost/react_task/login.php', {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            user_email: this.state.user_email,
                            user_password: this.state.password
                        })
                    }).then((res1) => {
                        localStorage.setItem("token", res1.data)
                        this.setState({
                            loggedIn: true
                        })
                    })
                } else {
                    swal("Email Already Exist", "", "warning");
                    this.setState({
                        user_name: '',
                        user_email: '',
                        password: '',
                    })
                }
            })
        }
    }

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

    responseFacebook = response => {
        const user_name = response.name
        const user_email = response.email
        
        const FinalValues = {
            user_name,
            user_email
        }
        var body = JSON.stringify(FinalValues)
        localStorage.setItem("user_email", user_email)
        axios.post('http://localhost/react_task/user_first1.php', body, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((res) => {
            if (res.data === 1) {
                axios.post('http://localhost/react_task/login1.php', {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        user_email: this.state.user_email
                    })
                }).then((res1) => {
                    localStorage.setItem("token", res1.data)
                    this.setState({
                        loggedIn: true
                    })
                })
            } else {
                swal("Email Already Exist", "", "warning");
                this.setState({
                    user_name: '',
                    user_email: '',
                    password: ''
                })
            }
        })
    }
    componentClicked = () => console.log("clicked");

    render(){
        let fbContent;
        if(this.state.loggedIn){
            return <Redirect to="/profile" />
        } else {
            fbContent = ( <FacebookLogin
                // appId="915291065493912"       //Sandbox4project account ID
                appId="2407895995943432"         //my account ID
                autoLoad={true}
                fields="name,email,picture"
                onClick={this.componentClicked}
                callback={this.responseFacebook} /> )
        }
        return(
            <div>
                <div className="limiter">
					<div className="container-login100">
						<div className="wrap-login100">
							<div className="login100-pic js-tilt">
                				<img src={logo1} alt="Logo1" />
							</div>
							<form className="login100-form validate-form">
								<span className="login100-form-title"> Student Signup </span>
								<div className="wrap-input100 validate-input">
                                <input className="input100" type="text"  name="user_name" placeholder="Enter Name" 
                                        value={this.state.fields.user_name} onChange={this.handleChange} />
                                <div className="errorMsg">{this.state.errors.user_name}</div>
									<span className="focus-input100"></span>
								</div>

                                <div className="wrap-input100 validate-input">
                                <input className="input100" type="email" name="user_email" placeholder="Enter Email" 
                                        value={this.state.fields.user_email} onChange={this.handleChange} />
                                <div className="errorMsg">{this.state.errors.user_email}</div>
									<span className="focus-input100"></span>
								</div>

								<div className="wrap-input100 validate-input">
                                <input className="input100" type="password" name="password" placeholder="Enter Password" 
                                        value={this.state.fields.password} onChange={this.handleChange} />
                                <div className="errorMsg">{this.state.errors.password}</div>
									<span className="focus-input100"></span>
								</div>
					
								<div className="container-login100-form-btn">
									<button className="login100-form-btn" onClick={this.handleSubmit} > Login </button>
								</div>
                    			<br />
								<div className="text-center p-t-136">
									<Link className="txt2" to="/slogin">
                                        <i className="fa fa-long-arrow-left m-l-5" aria-hidden="true"></i> 
                                        Already have an account
									</Link>
								</div>
							</form>
						</div>
					</div>
				</div>
    			<Homefooter />
        	</div>
        );
    }
}
export default Ssignup;