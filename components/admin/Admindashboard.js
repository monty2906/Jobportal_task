import React, {Component} from 'react';
import Adminsidebar from './Adminsidebar';
import Adminhead from './Adminhead';
import './Adminsidebar.css';
// import {Link} from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import MaterialTable from 'material-table';

class Admindashboard extends Component {
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
                        <div className="notificationtable">
                        <MaterialTable
                        columns={[
                        {  title:"Email", field: "email",
                        cellStyle: {
                            fontSize: '12px'
                          },
                          headerStyle: {
                            backgroundColor:'#7EE8F4',
                            fontSize: '12px',
                            fontStyle:'bold'
                          }
                        },

                        { title: "Messages", field: "message",
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
                        title="Notifications"
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
                    />
                        </div>
                    </div>
                </div>
        )
    }
}
export default Admindashboard;