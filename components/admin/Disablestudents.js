import React, {Component} from 'react';
import Adminsidebar from './Adminsidebar';
import Adminhead from './Adminhead';
import '../../css/Adminsidebar.css';
import MaterialTable from 'material-table';
import axios from 'axios';
import swal from 'sweetalert';
import { Redirect } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';

class Disablestudents extends Component {
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
                  showuser: showdetails
                })
            }) 
        }

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
                    
                    <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                       Select Account
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item to="/admin/allstudents">Active Accounts</Dropdown.Item>
                        <Dropdown.Item to="/admin/disablestudents">Disable Accounts</Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>

                    <MaterialTable
                       columns={[
                        {  title:"Id", field: "user_id",
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
        )
    }
}
export default Disablestudents;