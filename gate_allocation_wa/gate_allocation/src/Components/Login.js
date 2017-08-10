import React, {Component} from 'react';
import logo from '../Images/sfo_logo.png';
import background_image from '../Images/login_background.jpg';

import Input from 'react-toolbox/lib/input/Input';
import Button from 'react-toolbox/lib/button/Button';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      invalidInput: false
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(event) {
    event.preventDefault();
    this.props.onLoginSubmit(this.state.username, this.state.password, this.props.history);
  }

  handleChange = (name, value) => {
    this.setState({...this.state, [name]: value});
  };

  componentWillMount() {
    if (window.userName !== '' && window.fullName !== '') {
      this.props.alreadyLoggedIn(window.userName, window.fullName);
      this.props.history.push('/home');
    }
  }

  render() {
    return (
      <div class="center-in-row"
           style={{background: `url(${background_image}) no-repeat center center fixed`, backgroundSize: 'cover',
                   flex: 1}}>
        <div class="center-in-column">
          <div style={{  padding: '6vh 6vw', backgroundColor: 'rgba(0, 0, 0 ,0.85)', borderRadius: '7px'}}>
            <div class="center-in-row">
              <img src={logo} style={{height: '125px'}} alt="logo"/>
            </div>
            <div class="center-in-row">
              <div style={{color: '#fff', marginTop: '10px', fontSize: '2em', textAlign: 'center', marginBottom: '15px'}}>
                Optimized Gate Allocation Program
              </div>
            </div>
            <form id="login" onSubmit={this.handleLogin}>
              <div class="center-in-row">
                <Input className="login-input" type="text" maxLength="100" label="Username" onChange={this.handleChange.bind(this, 'username')} value={this.state.username}/>
              </div>
              <div class="center-in-row">
                <Input className="login-input" type="password" maxLength="100" label="Password" onChange={this.handleChange.bind(this, 'password')} value={this.state.password}/>
              </div>
              <input type="submit" style={{display: 'none'}} />
            </form>
              {(!this.props.authorized || this.state.invalidInput) &&
              <div class="center-in-row">
                <p style={{color: 'indianred'}}>Invalid username and/or password.</p>
              </div>
              }
              <div class="center-in-row" style={{marginTop: '20px'}}>
                <Button label="Login" raised primary onClick={this.handleLogin}/>
              </div>
            <div class="center-in-column" style={{marginTop: '20px', height: '45px', color: '#fff', fontSize: '.6em'}}>
              <span style={{textAlign: 'center', marginBottom: '2px'}}>For all technical assistance contact SFO Helpdesk at sfohelpdesk@flysfo.com or 650.821.4357</span>
              <span style={{textAlign: 'center'}}>© 2016 San Francisco International Airport . All Rights Reserved . Version: {window.appVersion} </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
