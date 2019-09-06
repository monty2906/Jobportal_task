import React, { Component } from 'react';
import logo1 from './images/img-01.png';
import './main.css';
import Homefooter from './Homefooter';
import { Link } from 'react-router-dom';
// import FacebookLogin from 'react-facebook-login';
import axios from 'axios';
import swal from 'sweetalert';
import { Redirect } from 'react-router-dom';
// import './util.css';

class Slogin extends Component {
	constructor(props) {
		super(props);
		const token = localStorage.getItem("token")
        let loggedIn = true
        if(token==null){
            loggedIn=false
        }
        this.state = {
            user_email: '',
            password: '',
			fields: {},
			errors: {},
			loggedIn
		}
		this.handleChange = this.handleChange.bind(this);
	}

	 // handle change function
	 handleChange = (e) => {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
          errors:'',
          fields
        });
	  }  
	  
	handleSubmit = (event) => {
		const user_email = this.state.fields.user_email
        const user_password = this.state.fields.password

		const FinalValues = {
			user_email,
			user_password
		}
		console.log(FinalValues)
		event.preventDefault();
        if (this.validateForm()) {
		var body = JSON.stringify(FinalValues)
		console.log(body)
			axios.post('http://localhost/react_task/userlogin.php',body, {
				headers: {
					'Content-Type': 'application/json'
				}
			}).then((res) => {
				if(res.data===1){
					localStorage.setItem("token", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9leGFtcGxlLm9yZyIsImF1ZCI6Imh0dHA6XC9cL2V4YW1wbGUuY29tIiwiaWF0IjoxMzU2OTk5NTI0LCJuYmYiOjEzNTcwMDAwMDAsImRhdGEiOnsidXNlcl9pZCI6bnVsbCwidXNlcl9uYW1lIjpudWxsLCJ1c2VyX2VtYWlsIjpudWxsfX0.u-IA-GT8Lul03Bfh2SYU7r-Ma6iPYzRFiMDHefyfW6k");
					const user_mail = this.state.fields.user_email
					localStorage.setItem("user_email", user_mail);
					this.setState({
						loggedIn: true,
						user_email: '',
						password: ''
					})
				}
				else if(res.data===0){
					swal("Your account was disabled!")
				}
				else{
					swal("Somthing Went Wrong.. try again letter!")
				}
			})
		}
	}

	validateForm() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
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

    render(){
		if(this.state.loggedIn){
			return <Redirect to="/profile" />
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
								<span className="login100-form-title"> Student Login </span>
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
								</div>
					
								<div className="container-login100-form-btn">
									<button className="login100-form-btn" onClick={this.handleSubmit}> Login </button>
								</div>
                    			<br />
								<div className="text-center p-t-136">
									<Link className="txt2" to="/ssignup"> Create New Account
										<i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
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
export default Slogin;