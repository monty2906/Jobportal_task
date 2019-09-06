import React, { Component } from 'react';
import './Homenavbar1.css'
import logo1 from './images/1.png';
import logo2 from './images/2.png';
import logo3 from './images/3.png';
import logo4 from './images/4.png';
import logo5 from './images/5.png';
import logo6 from './images/6.png';
import logo7 from './images/7.png';
import logo8 from './images/8.png';
import logo9 from './images/9.png';
import logo10 from './images/10.png';

class Recruiterlogo extends Component {
  
    render(){
        return(
          <section id="recruiters">
              <div className="container text-center">
                  <h2>Top Recruiters</h2>
                  <div>
                    <img src={logo1} alt="Logo1" />
                    <img src={logo2} alt="Logo2" />;
                    <img src={logo3} alt="Logo3" />;
                    <img src={logo4} alt="Logo4" />;
                    <img src={logo5} alt="Logo5" />;
                  </div>
                  <div>
                    <img src={logo6} alt="Logo6" />;
                    <img src={logo7} alt="Logo7" />;
                    <img src={logo8} alt="Logo8" />;
                    <img src={logo9} alt="Logo9" />;
                    <img src={logo10} alt="Logo10" />;
                  </div>

              </div>
          </section>
        );
    }
}
export default Recruiterlogo;