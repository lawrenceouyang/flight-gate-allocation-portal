import React, {Component} from "react";
import { Route, Link } from 'react-router-dom';
import color from '../Style/constants';
import Radium from 'radium';

import GateAssignmentFormContainer from '../Containers/GateAssignmentFormContainer';
import HomeContainer from '../Containers/HomeContainer';
import FlightPairFormContainer from '../Containers/FlightPairFormContainer';
import FlightGateFormContainer from '../Containers/FlightGateUploadFormContainer';

import logo from '../Images/sfo_logo.png';
import 'font-awesome/css/font-awesome.min.css';

import AppBar from 'react-toolbox/lib/app_bar/AppBar';
import Button from 'react-toolbox/lib/button/Button';
import Navigation from 'react-toolbox/lib/navigation/Navigation';
import Tab from 'react-toolbox/lib/tabs/Tab';
import Tabs from 'react-toolbox/lib/tabs/Tabs';
import Menu from 'react-toolbox/lib/menu/Menu';
import MenuItem from 'react-toolbox/lib/menu/MenuItem';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = { width: '0', height: '0', active: false };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleMenuHide = this.handleMenuHide.bind(this);
  }

  handleButtonClick = () => this.setState({ active: !this.state.active });
  handleMenuHide = () => this.setState({ active: false });

  componentWillMount() {
    if (this.props.username === '' && this.props.fullname === '') {
      if (window.userName !== '' && window.fullName !== '') {
        this.props.alreadyLoggedIn(window.userName, window.fullName);
      }
      else {
        this.props.history.push('/');
      }
    }
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {
    const ua = window.navigator.userAgent;

    const headerTitle = {
      fontWeight: 600,
      fontSize: '1.15em',
      flex: 1
    };

    const headerImageStyle = {
      height: '40px',
      display: 'block',
      marginRight: '15px'
    };


    const footerStyle = {
      marginTop: '20px',
      height: '45px',
      background: color.primaryColor,
      color: '#fff',
      fontSize: '.8em',
    };

    return (
      <div>
      <div class="layout-root">
        <AppBar>
          <Link to="/home"><img src={logo} style={headerImageStyle} alt="sfo-logo"/></Link>
          <div style={headerTitle}>{this.state.width >= 550 ? 'Optimized Gate Allocation Program' : 'OGAP' }</div>
          {(this.state.width >= 850 && (ua.indexOf('MSIE ') < 0 && ua.indexOf('Trident/') < 0)) &&
          <Navigation>
            <Tabs index={this.props.index} onChange={index => {
             this.props.changeTab(index);
             switch(index) {
              case 0:
                this.props.history.push('/fp'); break;
              case 1:
               this.props.history.push('/ga'); break;
              case 2:
                this.props.history.push('/fpga'); break;
              default:
                break;
             }
            }} style={{height: '100%'}} inverse>
              <Tab label={this.state.width >= 1000 ?'Flight Pairing' : 'Flight Pair'}/>
              <Tab label={this.state.width >= 1000 ? 'Gate Assignment' : 'Gate Assign'}/>
              <Tab label={this.state.width >= 1000 ?'Pair and Assign': 'Pair & Assign'}/>
            </Tabs>
          </Navigation>
          }
          <div style={{display: 'inline-block', position: 'relative', height: '100%'}}>
            <Button inverse style={{height: '100%'}} onClick={this.handleButtonClick}>
              <span>{this.state.width >= 910 ? this.props.fullname : this.props.fullname.split(' ').map(i => i[0]).join('')}</span>
              {/*<FontIcon value="menu" style={{paddingBottom: '2px', marginLeft: '10px'}}/>*/}
            </Button>
            <Menu position="topRight" active={this.state.active} onHide={this.handleMenuHide}>
              <MenuItem value="gate-assignment" caption="Gate Assignment" onClick={() => this.props.history.push('/ga')}/>
              <MenuItem value="flight-pairing" caption="Flight Pairing" onClick={() => this.props.history.push('/fp')}/>
              <MenuItem value="logout" caption="Logout" onClick={() => this.props.onLogout(this.props.history)}/>
            </Menu>
          </div>
        </AppBar>
        {(this.state.width < 850 || (ua.indexOf('MSIE ') > 0 || ua.indexOf('Trident/') > 0)) &&
        <Navigation>
          <Tabs index={this.props.index} onChange={index => {
             this.props.changeTab(index);
             switch(index) {
              case 0:
                this.props.history.push('/fp'); break;
              case 1:
               this.props.history.push('/ga'); break;
              case 2:
                this.props.history.push('/fpga'); break;
              default:
                break;
             }
            }} style={{height: '100%'}} inverse fixed>
            <Tab label="Flight Pairing"/>
            <Tab label="Gate Assignment" />
            <Tab label="Pair and Assign"/>
          </Tabs>
        </Navigation>
        }
        <div class="flex-root-row flex-center" style={{flex: '1 1 auto'}}>
          <div class="center-in-column" style={{flex: '1 1 auto'}}>
            <Route path='/home/' render={(props) => (<HomeContainer {...props} theme={this.props.theme} width={this.state.width} height={this.state.height}/>)} />
            <Route path='/ga/' render={(props) => (<GateAssignmentFormContainer {...props} theme={this.props.theme}/>)}/>
            <Route path='/fp/' render={(props) => (<FlightPairFormContainer {...props} theme={this.props.theme}/>)}/>
            <Route path='/fpga' render={(props) => (<FlightGateFormContainer {...props} theme={this.props.theme}/>)} />
          </div>
        </div>
        <div class="center-in-column" style={footerStyle}>
          <div class="center-in-column">
            <span style={{textAlign: 'center'}}>© 2016 San Francisco International Airport . All Rights Reserved . Version: {window.appVersion} </span>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default Radium(Layout);