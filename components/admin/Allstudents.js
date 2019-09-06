import React, {Component} from 'react';
import Adminsidebar from './Adminsidebar';
import Adminhead from './Adminhead';
import './Adminsidebar.css';
import MaterialTable from 'material-table';
import axios from 'axios';
import swal from 'sweetalert';
import { Redirect } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import './Adminshow.css';

class Allstudents extends Component {
    constructor(props) {
        super(props);
        const admintoken = localStorage.getItem("token_admin")
        let loggedIn = true;
        if(admintoken==null)
        {
            loggedIn = false;
        }
        this.state = {
            currentStep: 1,
            loggedIn,
            show:false,
            showuser:[]
        }
    }
     handleClose = () => {
      this.setState({ show: !this.state.show });
      }
      
      handleShow = () => {
      this.setState({ show: true });
      }

    componentDidMount() {
        axios.post('http://localhost/react_task/allstudents.php', {
          headers: {
              'Content-Type': 'application/json'
          }
      })
      .then((res)=>{ 
          var showall=res.data
          let showdataNew=[];
          for (let allname of showall)
          {
            showdataNew.push(allname);
          }
          this.setState({
            showall: showdataNew
          })
        }) 

        axios.post('http://localhost/react_task/showdisbled.php', {
          headers: {
              'Content-Type': 'application/json'
          }
      })
      .then((res)=>{ 
          var showall=res.data
          let showdataNew=[];
          for (let allname of showall)
          {
            showdataNew.push(allname);
          }
          this.setState({
            disableuser: showdataNew
          })
        }) 
      }

      //show student details when click
      showDetails = (rowData, event) => {
            const mail = event.user_email
            const Values = {
                mail
            }
            var body = JSON.stringify(Values)
            axios.post('http://localhost/react_task/showstudentsdetails.php',body, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((res)=>{ 
                var showall1=res.data
                let showdetails=[];
                for (let alldetail of showall1)
                {
                    showdetails.push(alldetail);
                }
                this.setState({
                  showuser: showdetails,
                  show:true
                })
            }) 
        }

        //disable student functionality
        disableStudent = (rowData, event) => {
            const mail = event.user_email
            const Values = {
                mail
            }
            var body = JSON.stringify(Values)
            axios.post('http://localhost/react_task/disablestudent.php',body, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((res)=>{ 
               console.log(res)
               swal("this student account is disabled!")
               window.location.reload(false);
            }) 
        }

        //enable student functionality
        enableStudent = (rowData, event) => {
            const mail = event.user_email
            const Values = {
                mail
            }
            var body = JSON.stringify(Values)
            axios.post('http://localhost/react_task/enablestudent.php',body, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((res)=>{ 
               console.log(res)
               swal("this student account was enabled!")
               window.location.reload(false);
            }) 
        }

    render(){
        if(this.state.loggedIn === false){
            return <Redirect to="/admin/login" />
        }
        return(
            <div className="wrapper">
                <Adminsidebar />
                <div class="main-panel">
                    <div className="mainhead">
                        <font size="5">Admin Dashboard</font>
                    </div>
                    <Adminhead />
                    <div className="container register">
                      <div className="row">
                        <div className="col-md-12 register-right">
                          <ul className="nav nav-tabs nav-justified" id="myTab" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Enable Accounts</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Disable Accounts</a>
                            </li>
                          </ul>
                          <br /><br /><br /><br />
                          <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                              <MaterialTable
                                columns={[
                                {  title:"Id", field: "user_id",
                                cellStyle: {
                                    fontSize: '12px'
                                  },
                                  headerStyle: {
                                    backgroundColor:'#7EE8F4',
                                    fontSize: '12px',
                                    fontStyle:'bold'
                                  }
                                },

                                { title: "Name", field: "user_name",
                                cellStyle: {
                                    fontSize: '12px'
                                  }, 
                                  headerStyle: {
                                    backgroundColor:'#7EE8F4',
                                    fontSize: '12px',
                                    fontStyle:'bold'
                                  }
                                },
                                
                                { title: "Student Email", field: "user_email",
                                cellStyle: {
                                    fontSize: '12px'
                                  },
                                  headerStyle: {
                                    backgroundColor:'#7EE8F4',
                                    fontSize: '12px',
                                    fontStyle:'bold'
                                  }
                                }, 

                                { title: "Create Account", field: "created",
                                cellStyle: {
                                    fontSize: '12px'
                                  },
                                  headerStyle: {
                                    backgroundColor:'#7EE8F4',
                                    fontSize: '12px',
                                    fontStyle:'bold'
                                  }
                                },
                              ]}
                              data={this.state.showall}
                              title="All Students"
                              options={{
                                  cellStyle: {
                                    backgroundColor:'#7EE8F4',
                                    fontSize: '12px',
                                    fontStyle:'bold'
                                  },
                                  rowStyle: {
                                    backgroundColor: '#EEE',
                                  },
                                  exportButton: true
                                }}
                                actions={[
                                  {
                                    icon: 'how_to_reg',
                                    tooltip: 'view',
                                    fontSize:'20px',
                                    onClick: (rowData, event) => this.showDetails(rowData, event)
                                  },
                                  {
                                    icon: 'person_add_disabled',
                                    tooltip: 'disable',
                                    onClick: (rowData, event) => this.disableStudent(rowData, event)
                                  },
                                ]}
                              />
                            </div>

                            <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                              <MaterialTable
                                columns={[
                                  { title:"Id", field: "user_id",
                                  cellStyle: {
                                      fontSize: '14px'
                                    },
                                    headerStyle: {
                                      backgroundColor:'#7EE8F4',
                                      fontSize: '14px',
                                      fontStyle:'bold'
                                    }
                                  },

                                  { title: "Name", field: "user_name",
                                  cellStyle: {
                                      fontSize: '14px'
                                    }, 
                                    headerStyle: {
                                      backgroundColor:'#7EE8F4',
                                      fontSize: '14px',
                                      fontStyle:'bold'
                                    }
                                  },
                                  
                                  { title: "Student Email", field: "user_email",
                                  cellStyle: {
                                      fontSize: '14px'
                                    },
                                    headerStyle: {
                                      backgroundColor:'#7EE8F4',
                                      fontSize: '14px',
                                      fontStyle:'bold'
                                    }
                                  }, 

                                  { title: "Create Account", field: "created",
                                  cellStyle: {
                                      fontSize: '14px'
                                    },
                                    headerStyle: {
                                      backgroundColor:'#7EE8F4',
                                      fontSize: '14px',
                                      fontStyle:'bold'
                                    }
                                  },
                                ]}
                                data={this.state.disableuser}
                                title="Disable Student Accounts"
                                options={{
                                    cellStyle: {
                                      backgroundColor:'#7EE8F4',
                                      fontSize: '14px',
                                      fontStyle:'bold'
                                    },
                                    rowStyle: {
                                      backgroundColor: '#EEE',
                                    },
                                    exportButton: true
                                  }}
                                  actions={[
                                    {
                                      icon: 'accessibility_new',
                                      tooltip: 'enable',
                                      onClick: (rowData, event) => this.enableStudent(rowData, event)
                                    }
                                  ]}
                                  editable={{
                                      onRowDelete: oldData =>
                                      new Promise((resolve, reject) => {
                                      setTimeout(() => {
                                      {
                                        let data = this.state.showall;
                                        const index = data.indexOf(oldData);
                                        data.splice(index, 1);
                                        const body = JSON.stringify(oldData)
                                        axios.post('http://localhost/react_task/deletestudents.php', body, {
                                          headers: {
                                            'Content-Type': 'application/json'
                                          }
                                        })
                                        alert("Delete Succesful");
                                        swal('deleted succesfully');
                                        this.setState({ data }, () => resolve());
                                      }
                                        resolve()
                                      }, 1000)
                                    }),
                                  }}
                              />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

                  <Modal show={this.state.show} onHide={this.handleClose} >
                    <Modal.Header closeButton>
                      <Modal.Title>Student Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div >
                        <div>
                        {this.state.showuser.map((alldata1) => {            
                          return (
                              <div>
                                <center>
                                  <table width="75%" font-size="18px">
                                    <tr>
                                      <td><font size="3"><b>Name</b></font></td>
                                      <td><font size="3"><b>:- {alldata1.user_full_name}</b></font></td>
                                    </tr>
                                    <tr>
                                      <td><font size="3"><b>Email</b></font></td>
                                      <td><font size="3"><b>:- {alldata1.user_email}</b></font></td>
                                    </tr>
                                    <tr>
                                      <td><font size="3"><b>Number</b></font></td>
                                      <td><font size="3"><b>:- {alldata1.contact_number}</b></font></td>
                                    </tr>
                                    <tr>
                                      <td><font size="3"><b>Skills</b></font></td>
                                      <td><font size="3"><b>:- {alldata1.user_skills}</b></font></td>
                                    </tr>
                                    <tr>
                                      <td><font size="3"><b>Experience</b></font></td>
                                      <td><font size="3"><b>:- {alldata1.user_experience}</b></font></td>
                                    </tr>
                                    <tr>
                                      <td><font size="3"><b>Graduation Year</b></font></td>
                                      <td><font size="3"><b>:- {alldata1.graduation_year}</b></font></td>
                                    </tr>
                                    <tr>
                                      <td><font size="3"><b>Graduation Course</b></font></td>
                                      <td><font size="3"><b>:- {alldata1.graduation_course}</b></font></td>
                                    </tr>
                                    <tr>
                                      <td><font size="3"><b>Graduation Percent</b></font></td>
                                      <td><font size="3"><b>:- {alldata1.graduation_percent}%</b></font></td>
                                    </tr>
                                    <tr>
                                      <td><font size="3"><b>College Name</b></font></td>
                                      <td><font size="3"><b>:- {alldata1.college_name}</b></font></td>
                                    </tr>
                                  </table>
                                </center>
                              </div>
                              )
                            })}
                          </div>
                    <Modal.Footer>
                      <Button className="mybtn" variant="secondary" onClick={this.handleClose}>
                      Close
                      </Button>
                    </Modal.Footer>
                    </div>
                  </Modal.Body>
                </Modal>
            </div>
          </div>
        );
    }
}
export default Allstudents;