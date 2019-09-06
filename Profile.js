import React, { Component } from 'react';
import './Profile.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import Homefooter from './Homefooter';
import Profilenavbar from './Profilenavbar';
import swal from 'sweetalert';

class Profile extends Component{
    constructor(props) {
        super(props);
        const token = localStorage.getItem("token");
        let loggedIn = true
        if(token==null){
            loggedIn=false
        }
        this.state = {
            showall: [],
            fields: {},
            errors: {},
            loggedIn
        }
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

      checkUser = (id) => {
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
            })
    }

    render(){
        if(this.state.loggedIn===false){
			return <Redirect to="/slogin" />
		} 
        return(
            <div>
                <Profilenavbar />
                <section id="bottom-section" className="text-center">
                  <h1><b>All Jobs</b></h1>
              </section>
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
                                <button type="button" className="btn btn-primary" data-toggle="modal" 
                                onClick={()=>this.checkUser(alldata.job_id)}
                                >I am Interested</button>
                            </div>
                        </div>
                             )
                            }
                          })}
                    </div>
                </section>
                <Homefooter />
            </div>
        );
    }
}
export default Profile;