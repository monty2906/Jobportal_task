import React from 'react';
import { Route,Switch, BrowserRouter as Router } from 'react-router-dom';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
// import history from './history';

// import Notfound from './components/Notfound';
// // import Home from './components/Home';
// import Signup from './components/Signup';
import Home1 from './Home1';
import Slogin from './Slogin';
import Ssignup from './Ssignup';
import Profile from './Profile';
import logout from './logout';
import Updateprofile from './Updateprofile';
import Changemail from './Changemail';
import Viewprofile from './Viewprofile';
import Userjobs from './Userjobs';

// import Signup from './components/recruiter/Signup';
// import Login from './components/recruiter/Login';
// import Addjobs from './components/recruiter/Addjobs';
// import Showstudents from './components/recruiter/Showstudents';
// import Recruiterlogout from './components/recruiter/Recruiterlogout';
// import Recruiteremail from './components/recruiter/Recruiteremail';
// import Recruiterprofile from './components/recruiter/Recruiterprofile';
// import Showjobwise from './components/recruiter/Showjobwise';

// import Adminlogin from './components/admin/Adminlogin';
// import Admindashboard from './components/admin/Admindashboard';
// import Showrequests from './components/admin/Showrequests';
// import Adminlogout from './components/admin/Adminlogout';
// import Showrecruiters from './components/admin/Showrecruiters';
// import Allstudents from './components/admin/Allstudents';


function App() {
  return (
    <div className="App">
    {/* <Router history={history}> */}
      <Router>
        <Switch>  
              {/* Admin Routing Components */}
              {/* <Route exact path="/admin/dashboard" component={Admindashboard} />
              <Route exact path="/admin/login" component={Adminlogin} />
              <Route exact path="/admin/logout" component={Adminlogout} />
              <Route exact path="/admin/showrequests" component={Showrequests} />
              <Route exact path="/admin/showrecruiters" component={Showrecruiters} />
              <Route exact path="/admin/allstudents" component={Allstudents} /> */}

              {/* Recruiter Routing Components */}


              {/* Students Routing Components */}
              {/* <Route exact path="/" component={Home} /> */}
              {/* <Route exact path="/signup" component={Signup} /> */}
              <Route exact path="/" component={Home1} />
              <Route exact path="/slogin" component={Slogin} />
              <Route exact path="/ssignup" component={Ssignup} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/logout" component={logout} />
              <Route exact path="/updateprofile" component={Updateprofile} />
              <Route exact path="/changemail" component={Changemail} />
              <Route exact path="/viewprofile" component={Viewprofile} />
              <Route exact path="/userjobs" component={Userjobs} />

              
              {/* <Route component={Notfound} />   */}
        </Switch> 
      </Router>
    </div>
  );
}
export default App;
