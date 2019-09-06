import React, {Component} from 'react';
import Adminsidebar from './Adminsidebar';
import Adminhead from './Adminhead';
import './Adminsidebar.css';
import MaterialTable from 'material-table';
import axios from 'axios';
import swal from 'sweetalert';
import { Redirect } from 'react-router-dom';
import './Adminshow.css';

class Showrecruiters extends Component {
  constructor(props) {
    super(props);
    const admintoken = localStorage.getItem("token_admin")
    let loggedIn = true;
    if(admintoken==null)
    {
        loggedIn = false;
    }
    this.state = {
        showall:[],
        showuser:[],
        showdisable:[],
        loggedIn
    }
  }
    componentDidMount() {
      axios.post('http://localhost/react_task/sohwrecruiter.php', {
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

       axios.post('http://localhost/react_task/showdiablerecruiter.php', {
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
            showdisable: showdataNew
          })
        }) 
      }

    disableRecruiter = (rowData, event) => {
      const mail = event.recruiter_email
      const Values = {
        mail
      }
      var body = JSON.stringify(Values)
      axios.post('http://localhost/react_task/disablerecruiter.php',body, {
        headers: {
            'Content-Type': 'application/json'
        }
      })
      .then((res)=>{ 
      console.log(res)
      swal("this recruiter account is disabled!")
      window.location.reload(false);
      }) 
    }

    enableRecruiter = (rowData, event) => {
      const mail = event.recruiter_email
      const Values = {
        mail
      }
      var body = JSON.stringify(Values)
      axios.post('http://localhost/react_task/enablerecruiter.php',body, {
        headers: {
            'Content-Type': 'application/json'
        }
      })
      .then((res)=>{ 
      console.log(res)
      swal("this recruiter account was enabled!")
      window.location.reload(false);
      }) 
    }

    render(){
      if(this.state.loggedIn === false){
        return <Redirect to="/admin" />
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
                                  { title: "First Name", field: "recruiter_name",
                                  cellStyle: {
                                      fontSize: '13px'
                                    },
                                    headerStyle: {
                                      backgroundColor:'#7EE8F4',
                                      fontSize: '13px',
                                      fontStyle:'bold'
                                    }
                                  },

                                  { title: "Last Name", field: "recruiter_last_name",
                                  cellStyle: {
                                      fontSize: '13px'
                                    }, 
                                    headerStyle: {
                                      backgroundColor:'#7EE8F4',
                                      fontSize: '13px',
                                      fontStyle:'bold'
                                    }
                                  },
                                  
                                  { title: "Email", field: "recruiter_email",
                                  cellStyle: {
                                      fontSize: '13px'
                                    },
                                    headerStyle: {
                                      backgroundColor:'#7EE8F4',
                                      fontSize: '13px',
                                      fontStyle:'bold'
                                    }
                                  }, 

                                  { title:"Mo. Number", field: "recruiter_number",
                                  cellStyle: {
                                      fontSize: '13px'
                                    },
                                    headerStyle: {
                                      backgroundColor:'#7EE8F4',
                                      fontSize: '13px',
                                      fontStyle:'bold'
                                    }
                                  },

                                  { title: "Designation", field: "recruiter_post",
                                  cellStyle: {
                                      fontSize: '13px'
                                    }, 
                                    headerStyle: {
                                      backgroundColor:'#7EE8F4',
                                      fontSize: '13px',
                                      fontStyle:'bold'
                                    }
                                  },

                                  { title: "Company Name", field: "company_name",
                                  cellStyle: {
                                      fontSize: '13px'
                                    },
                                    headerStyle: {
                                      backgroundColor:'#7EE8F4',
                                      fontSize: '13px',
                                      fontStyle:'bold'
                                    } 
                                  },

                                  { title: "Company City", field: "company_city",
                                  cellStyle: {
                                      fontSize: '13px'
                                    },
                                    headerStyle: {
                                      backgroundColor:'#7EE8F4',
                                      fontSize: '13px',
                                      fontStyle:'bold'
                                    }
                                  },

                                  { title: "Company Address", field: "company_address",
                                  cellStyle: {
                                      fontSize: '13px'
                                    },
                                    headerStyle: {
                                      backgroundColor:'#7EE8F4',
                                      fontSize: '13px',
                                      fontStyle:'bold'
                                    }
                                  }
                                  ]}
                                  data={this.state.showall}
                                  title="Show recruiters"
                                  options={{
                                        cellStyle: {
                                          backgroundColor:'#7EE8F4',
                                          fontSize: '13px',
                                          fontStyle:'bold'
                                        },
                                        rowStyle: {
                                          backgroundColor: '#EEE',
                                        },
                                      exportButton: true
                                    }}
                                  actions={[
                                    {
                                      icon: 'person_add_disabled',
                                      tooltip: 'disable',
                                      onClick: (rowData, event) => this.disableRecruiter(rowData, event)
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
                                          axios.post('http://localhost/react_task/del.php', body, {
                                            headers: {
                                              'Content-Type': 'application/json'
                                              }
                                            })
                                            swal('Your record has been deleted succesfully');
                                            this.setState({ data }, () => resolve());
                                        }
                                          resolve()
                                        }, 1000)
                                    }),
                                }}
                              />
                            </div>

                            <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                              <MaterialTable
                                  columns={[
                                    { title: "First Name", field: "recruiter_name",
                                    cellStyle: {
                                        fontSize: '13px'
                                      },
                                      headerStyle: {
                                        backgroundColor:'#7EE8F4',
                                        fontSize: '13px',
                                        fontStyle:'bold'
                                      }
                                    },
            
                                    { title: "Last Name", field: "recruiter_last_name",
                                    cellStyle: {
                                        fontSize: '13px'
                                      }, 
                                      headerStyle: {
                                        backgroundColor:'#7EE8F4',
                                        fontSize: '13px',
                                        fontStyle:'bold'
                                      }
                                    },
                                    
                                    { title: "Email", field: "recruiter_email",
                                    cellStyle: {
                                        fontSize: '13px'
                                      },
                                      headerStyle: {
                                        backgroundColor:'#7EE8F4',
                                        fontSize: '13px',
                                        fontStyle:'bold'
                                      }
                                    }, 
            
                                    { title:"Mo. Number", field: "recruiter_number",
                                    cellStyle: {
                                        fontSize: '13px'
                                      },
                                      headerStyle: {
                                        backgroundColor:'#7EE8F4',
                                        fontSize: '13px',
                                        fontStyle:'bold'
                                      }
                                    },
            
                                    { title: "Designation", field: "recruiter_post",
                                    cellStyle: {
                                        fontSize: '13px'
                                      }, 
                                      headerStyle: {
                                        backgroundColor:'#7EE8F4',
                                        fontSize: '13px',
                                        fontStyle:'bold'
                                      }
                                    },
            
                                    { title: "Company Name", field: "company_name",
                                    cellStyle: {
                                        fontSize: '13px'
                                      },
                                      headerStyle: {
                                        backgroundColor:'#7EE8F4',
                                        fontSize: '13px',
                                        fontStyle:'bold'
                                      } 
                                    },
            
                                    { title: "Company City", field: "company_city",
                                    cellStyle: {
                                        fontSize: '13px'
                                      },
                                      headerStyle: {
                                        backgroundColor:'#7EE8F4',
                                        fontSize: '13px',
                                        fontStyle:'bold'
                                      }
                                    },
            
                                    { title: "Company Address", field: "company_address",
                                    cellStyle: {
                                        fontSize: '13px'
                                      },
                                      headerStyle: {
                                        backgroundColor:'#7EE8F4',
                                        fontSize: '13px',
                                        fontStyle:'bold'
                                      }
                                    }
                                    ]}
                                    data={this.state.showdisable}
                                    title="Show recruiters"
                                    options={{
                                      cellStyle: {
                                        backgroundColor:'#7EE8F4',
                                        fontSize: '13px',
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
                                      onClick: (rowData, event) => this.enableRecruiter(rowData, event)
                                    }
                                  ]}
                                />
                              </div>
                            </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        )
    }
}
export default Showrecruiters;