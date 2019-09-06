import React, { Component } from 'react';
import Homenavbar1 from './Homenavbar1';
import Recruiterlogo from './Recruiterlogo';
import './Home1.css';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';
import swal from 'sweetalert';
import { Redirect } from 'react-router-dom';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
// import { Modal } from 'react-bootstrap';
import Bottomsection from './Bottomsection';
import Homefooter from './Homefooter';
import Modal from 'react-modal';
// import 'bootstrap/dist/css/bootstrap.css';

class Home1 extends Component{
    constructor(props) {
        super(props);
        this.onEntering = this.onEntering.bind(this);
        this.onEntered = this.onEntered.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: false, status: 'Closed' };
        
        const token = localStorage.getItem("token")
        let logIn = true
        if (token == null) {
            logIn = false
        }
        this.state = {
            user_name: '',
            user_email: '',
            password: '',
            apply_name:'',
            apply_email:'',
            apply_experience:'',
            apply_number:'',
            showall: [],
            loggedIn: '',
            logIn,
            fields: {},
            errors: {},
            show: false,
            modalIsOpen: false
        }
        this.handleChange = this.handleChange.bind(this);
    }

    onEntering() {
        this.setState({ status: 'Opening...' });
    }
    
    onEntered() {
        this.setState({ status: 'Opened' });
    }
    
    onExiting() {
        this.setState({ status: 'Closing...' });
    }
    
    onExited() {
        this.setState({ status: 'Closed' });
    }
    
    toggle() {
        this.setState(state => ({ collapse: !state.collapse }));
    }

    componentDidMount() {
        var tempDate = new Date();
        var date = tempDate.getFullYear() + '-0' + (tempDate.getMonth()+1) + '-' + tempDate.getDate();
        axios.get('http://localhost/react_task/showjobs.php', {
          headers: {
              'Content-Type': 'application/json'
          }
      }).then((res)=>{ 
            var showall=res.data
            let showdataNew=[];
            for (let allname of showall)
            {
            showdataNew.push(allname);
            }
            this.setState({
            showall: showdataNew,
            current_date: date
            })
        }) 
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

    // handle submit function
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
            localStorage.setItem("user_email", this.state.fields.user_email)
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

    // check user logged in or not, if looged in check his/her profile 90% fill or not
    checkUser = (id) => {
        if (this.state.logIn === true) {
            const user_mail = localStorage.getItem("user_email")
            axios.post('http://localhost/react_task/check_profile.php', {
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_email: user_mail
                })
            }).then((res1) => {
                if(res1.data < 90){
                    swal('please complete your profile atleast 90%');
                }
                else{
                    swal("you want to apply for this job?", {
                        buttons: {
                          cancel: "No",
                          catch: {
                            text: "Yes",
                            value: "catch",
                          }
                        },
                      })
                      .then((value) => {
                         switch (value) {
                          case "catch":
                            axios.post('http://localhost/react_task/apply_job.php', {
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    job_id: id,
                                    apply_email: user_mail
                                })
                            }).then((res) => {
                               swal({
                                position: 'top-right',
                                type: 'success',
                                title: 'Successfully Apply..',
                                showConfirmButton: true,
                                timer: 1000
                              })
                            })
                            break;
                       
                          default:
                            swal("apply cancle!");
                        }
                      });
                }
                this.setState({
                    loggedIn: true
                })
            })
         }
        else {
            this.setState({modalIsOpen: true});
        }
    }

      openModal=()=>{
        this.setState({ modalIsOpen: true });
      }
      closeModal=()=>{
        this.setState({ 
            user_name: '',
            user_email: '',
            password: '',
            errors:'',
            modalIsOpen: false
            });
      }

    
    // Facbook login
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
                <Homenavbar1 />
                <Recruiterlogo />
                <section id="jobs">
                    <div className="container">
                        <h3>RECENT UPDATES</h3>
                        {this.state.showall.map((alldata ,i) => {
                    const today = this.state.current_date
                    const job_date = alldata.last_date                
                    if(today<job_date) {
                    return (
                        <div className="job-details" key={i}>
                            <div className="job-update">
                                <h2><b>{alldata.job_name}</b></h2>
                                <h3>{alldata.company_name}</h3>
                                <i className="fa fa-briefcase"></i><span>{alldata.job_post}</span><br />
                                <i className="fa fa-inr"></i><span>{alldata.job_package}</span><br />
                                <i className="fa fa-map-marker"></i><span>{alldata.job_location}</span>
                                <Button className="toggle_button" onClick={this.toggle} style={{ marginBottom: '1rem' }} align="right">Read More</Button>
                                    <Collapse
                                     isOpen={this.state.collapse}
                                     onEntering={this.onEntering}
                                     onEntered={this.onEntered}
                                     onExiting={this.onExiting}
                                     onExited={this.onExited}
                                     >
                                    <Card>
                                    <CardBody>
                                        <i className="fa fa-star"></i><span>Experience:-{alldata.job_experience}</span><br />
                                        <i className="fa fa-calendar"></i><span>{alldata.last_date} (Last date to apply)</span><br />
                                        <p>Description <i className="fa fa-arrow-right"></i>{alldata.job_description}</p>
                                    </CardBody>
                                 </Card>
                                </Collapse>
                            </div>
                            <div className="apply-btn"> 
                                <button type="button" className="btn btn-primary"
                                onClick={()=>this.checkUser(alldata.job_id)}
                                >I am Interested</button>
                            </div>
                        </div>
                             )
                            }
                          })}
                    </div>
                </section>

                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    contentLabel="Example Modal"
                    className="modal-design"
                    >
                    <form className="my-form">
                    <div className="cross"><i className="fa fa-times" onClick={this.closeModal}></i></div>
                    <h2>Signup</h2>
                    <hr />
                        <i className="fa fa-user">&nbsp;&nbsp;&nbsp;</i>
                        <label><b>Name</b></label>
                        <input type="text"  name="user_name" placeholder="Enter Name" 
                                value={this.state.fields.user_name} onChange={this.handleChange} />
                        <div className="errorMsg">{this.state.errors.user_name}</div>

                        <i className="fa fa-envelope prefix grey-text">&nbsp;&nbsp;&nbsp;</i>
                        <label><b>Email</b></label>
                        <input type="email" name="user_email" placeholder="Enter Email" 
                                value={this.state.fields.user_email} onChange={this.handleChange} />
                        <div className="errorMsg">{this.state.errors.user_email}</div>

                        <i className="fa fa-unlock-alt">&nbsp;&nbsp;&nbsp;</i>
                        <label><b>Password</b></label>
                        <input type="password" name="password" placeholder="Enter Password" 
                                value={this.state.fields.password} onChange={this.handleChange} />
                        <div className="errorMsg">{this.state.errors.password}</div>

                        <button type="button" className="btn modal_form_btn" 
                                onClick={this.handleSubmit} data-dismiss="modal" > Submit </button>

                        <center><h3>OR</h3>
                        <div>{fbContent}</div></center>
                        <hr />
                        <button type="button" className="btn modal_form_close" 
                                onClick={this.closeModal}>close</button>
                      </form>
                    </Modal>
                <Bottomsection />
                <Homefooter />
            </div>
        );
    }
}
export default Home1;