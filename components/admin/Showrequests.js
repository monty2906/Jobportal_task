import React, {Component} from 'react';
import Adminsidebar from './Adminsidebar';
import Adminhead from './Adminhead';
import './Adminsidebar.css';
import MaterialTable from 'material-table';
import axios from 'axios';
import swal from 'sweetalert';
// import {Link} from 'react-router-dom';
import { Redirect } from 'react-router-dom';

class Showrequests extends Component {
    constructor(props) {
        super(props);
        const admintoken = localStorage.getItem("token_admin")
        let loggedIn = true;
        if(admintoken==null)
        {
            loggedIn = false;
        }
        this.state = {
            loggedIn
        }
    }

    componentDidMount() {
        axios.post('http://localhost/react_task/requests.php', {
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
      }

      approveRecruiter = (rowData, event) => {
        const id = event.recruiter_id
        const FinalValues = {
            id
        }
        var body = JSON.stringify(FinalValues)
        console.log(body)
        axios.post('http://localhost/react_task/approve.php', body,{
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res1) => {
            swal("Added to as a recruiter")
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
                    <MaterialTable
                        columns={[
                        { title: "First Name", field: "recruiter_name",
                        cellStyle: {
                            fontSize: '14px'
                          },
                          headerStyle: {
                            backgroundColor:'#7EE8F4',
                            fontSize: '14px',
                            fontStyle:'bold'
                          }
                        },

                        { title: "Last Name", field: "recruiter_last_name",
                        cellStyle: {
                            fontSize: '14px'
                          }, 
                          headerStyle: {
                            backgroundColor:'#7EE8F4',
                            fontSize: '14px',
                            fontStyle:'bold'
                          }
                        },
                        
                        { title: "Email", field: "recruiter_email",
                        cellStyle: {
                            fontSize: '14px'
                          },
                          headerStyle: {
                            backgroundColor:'#7EE8F4',
                            fontSize: '14px',
                            fontStyle:'bold'
                          }
                         }, 

                        { title:"Mo. Number", field: "recruiter_number",
                        cellStyle: {
                            fontSize: '14px'
                          },
                          headerStyle: {
                            backgroundColor:'#7EE8F4',
                            fontSize: '14px',
                            fontStyle:'bold'
                          }
                        },

                        { title: "Designation", field: "recruiter_post",
                        cellStyle: {
                            fontSize: '14px'
                          }, 
                          headerStyle: {
                            backgroundColor:'#7EE8F4',
                            fontSize: '14px',
                            fontStyle:'bold'
                          }
                        },

                        { title: "Company Name", field: "company_name",
                        cellStyle: {
                            fontSize: '14px'
                          },
                          headerStyle: {
                            backgroundColor:'#7EE8F4',
                            fontSize: '14px',
                            fontStyle:'bold'
                          } 
                        },

                        { title: "Company City", field: "company_city",
                        cellStyle: {
                            fontSize: '14px'
                          },
                          headerStyle: {
                            backgroundColor:'#7EE8F4',
                            fontSize: '14px',
                            fontStyle:'bold'
                          }
                         },

                        { title: "Company Address", field: "company_address",
                        cellStyle: {
                            fontSize: '14px'
                          },
                          headerStyle: {
                            backgroundColor:'#7EE8F4',
                            fontSize: '14px',
                            fontStyle:'bold'
                          }
                         }
                        ]}
                        data={this.state.showall}
                        title="Recruiter Requests"
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
                                icon: 'check_circle_outline',
                                tooltip: 'Approve',
                                onClick: (rowData, event) => this.approveRecruiter(rowData, event)
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
                                      alert("Delete Succesful");
                                      // swal('Your record has been deleted succesfully');
                                      this.setState({ data }, () => resolve());
                                  }
                                  resolve()
                              }, 1000)
                          }),
                      }}
                    />
                </div>
            </div>
        )
    }
}
export default Showrequests;