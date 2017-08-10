import React, { Component } from "react";
import Radium from 'radium';
import gatePhoto from '../Images/aerial_gates.jpg';
import flightPhoto from '../Images/planes.jpg';
import flightGatePhoto from '../Images/airplane_going_to_gate.jpg';

import Button from 'react-toolbox/lib/button/Button';
import Card from 'react-toolbox/lib/card/Card';
import CardMedia from 'react-toolbox/lib/card/CardMedia';
import CardTitle from 'react-toolbox/lib/card/CardTitle';
import CardText from 'react-toolbox/lib/card/CardText';
import CardActions from 'react-toolbox/lib/card/CardActions';


class Home extends Component {
  componentWillMount() {
    this.props.changeTab(3);
    if (this.props.username === '' && this.props.fullname === '') {
      if (window.userName !== '' && window.fullName !== '') {
        this.props.alreadyLoggedIn(window.userName, window.fullName);
      }
      else {
        this.props.history.push('/');
      }
    }
  }

  render() {
    return (
      <div class="center-in-row">
        <div class={this.props.width >= 900 ? "flex-row" : "flex-column"}>
          <div style={{margin: '10px', width: (this.props.width >= 900 ? "275px" : "auto")}}>
            <Button className="height-100p clear-padding full-width" onClick={() => this.props.history.push('/fp')}>
              <Card className="clear-text-transform">
                <CardTitle title="Flight Pairing"/>
                <CardMedia image={flightPhoto} aspectRatio="wide"/>
                <CardText>
                  {'Pair arriving and departing flights.'}
                </CardText>
                <CardActions className="flex-center">
                  <Button label="Go To Flight Pairing" onClick={() => this.props.history.push('/fp')} primary/>
                </CardActions>
              </Card>
            </Button>
          </div>
          <div style={{margin: '10px', width: (this.props.width >= 900 ? "275px" : "auto")}}>
            <Button className="height-100p clear-padding full-width" onClick={() => this.props.history.push('/ga')}>
              <Card className="clear-text-transform">
                <CardTitle title="Gate Assignment" />
                <CardMedia image={gatePhoto} aspectRatio="wide"/>
                <CardText>
                  {'Assign paired flights to gates.'}
                </CardText>
                <CardActions className="flex-center">
                  <Button label="Go To Gate Assignment" primary/>
                </CardActions>
              </Card>
            </Button>
          </div>
          <div style={{margin: '10px', width: (this.props.width >= 900 ? "275px" : "auto")}}>
            <Button className="height-100p clear-padding full-width" onClick={() => this.props.history.push('/fpga')}>
              <Card className="clear-text-transform">
                <CardTitle title="Pair and Assign" />
                <CardMedia image={flightGatePhoto} aspectRatio="wide"/>
                <CardText>
                  {'Pair flights and assign them to gates.'}
                </CardText>
                <CardActions className="flex-center">
                  <Button label="Go To Pair and Assign" primary/>
                </CardActions>
              </Card>
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Radium(Home);