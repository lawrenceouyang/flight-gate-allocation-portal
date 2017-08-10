import React, {Component} from "react";
import {Link} from "react-router-dom";
import Radium from 'radium';

import swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import InputField from './FormComponents/InputField';
import ExcelInput from './FormComponents/ExcelInput';
import SuccessMessage from './SuccessMessage';

import Button from 'react-toolbox/lib/button/Button';
import Card from 'react-toolbox/lib/card/Card';


class GateAssignmentUploadForm extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      email: this.props.username,
      scenarioName: '',
      maxGateTime: 120,
      towOn: 60,
      towOff: 60,
      incConst: 999,
      intergateTime: 25,
      maxSolveTime: 10,
      resolution: 10,
      makeGanttCharts: false,
      colorByAircraft: false,
      filename: '',
      file: '',
      error: {
        email: null,
        scenarioName: null,
        maxGateTime: null,
        towOnOff: null,
        incConst: null,
        intergateTime: null,
        maxSolveTime: null,
        resolution: null,
        makeGanttCharts: null,
        colorByAircraft: null,
        filename: null,
        file: null,
      }
    };
    this.validateField = this.validateField.bind(this);
    this.fileUploadChange = this.fileUploadChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.postData = this.postData.bind(this);
  }

  componentDidMount() {
    this.props.changeTab(1);
    this.props.toggleUpload(false);
  }

  validateField(field, value) {
    const error = this.state.error;
    if (value === '') {
      error[field] = "This field is required.";
      this.setState({error});
    }
    else if (error[field] !== null) {
      error[field] = null;
      this.setState({error});
    }
  }

  handleChange = (name, value) => {
    this.setState({...this.state, [name]: value});
    this.validateField(name, value);
  };

  fileUploadChange = e => {
    this.setState({filename: e.target.value.split('\\').pop(), file: e.target.files[0]});
    this.validateField('filename', e.target.value)
  };

  handleSubmit(e) {
    console.log(e);
    e.preventDefault();
    Object.keys(this.state).forEach(key => {
      this.validateField(key, this.state[key])
    });
    let invalid = false;
    Object.keys(this.state.error).forEach(key => {
      if (this.state.error[key] !== null) {
        invalid = true;
      }
    });
    if (invalid)
      return false;
    if (this.state.maxSolveTime >= 15) {
      swal({
        title: 'Long Wait Time Warning',
        text: `Are you sure you want to allow the gate allocation program to run for ${this.state.maxSolveTime} minutes?`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      })
        .then(() => {
          this.postData();
        }, (dismiss) => {
        })
    }
    else {
      this.postData();
    }
  }

  postData() {
    const data = new FormData();
    Object.keys(this.state).forEach(key => data.append(key, this.state[key]));
    fetch('/run-gate-allocation/', {
      credentials: 'same-origin',
      method: 'POST',
      body: data
    })
      .then(r => {
        if (r.status >= 200 && r.status < 300) {
          console.log('success');
          this.props.toggleUpload(true);
        }
        else {
          r.text().then(data => {
            console.log(data);
            this.props.uploadFailed(data);
          });
        }
      })
      .catch(() => {
        this.props.uploadFailed('There was a network error. Please refresh the page and try again.');
      })
  }

  render() {
    const formFields = [
      {
        name: "email",
        label: 'Email',
        type: "email",
        maxLength: 100,
        validations: ['required', 'email'],
      },
      {
        name: "scenarioName",
        label: 'Scenario Name',
        type: "text",
        maxLength: 100,
        validations: ['required'],
      },
      {
        name: "maxGateTime",
        label: "Maximum Time at Gate (Minutes)",
        type: "slider",
        min: 0,
        max: 300,
        step: 10
      },
      {
        name: "towOn",
        label: "Tow On (Minutes)",
        type: "slider",
        min: 0,
        max: 180,
        step: 10
      },
      {
        name: "towOff",
        label: "Tow Off (Minutes)",
        type: "slider",
        min: 0,
        max: 180,
        step: 10
      },
      {
        name: "intergateTime",
        label: "Intergate Time (Minutes)",
        type: "slider",
        min: 0,
        max: 120,
        step: 5
      },
      {
        name: "incConst",
        label: "Hard Constraint Cost",
        type: "slider",
        min: 0,
        max: 4995,
        step: 999
      },
      {
        name: "maxSolveTime",
        label: "Max Solve Time (Minutes)",
        type: "slider",
        min: 0,
        max: 600,
        step: 15
      },
      {
        name: "resolution",
        label: "Resolution (Minutes)",
        type: "slider",
        min: 1,
        max: 10,
        step: 1
      },
      {
        name: "makeGanttCharts",
        label: "Make Gantt Charts",
        type: "checkbox"
      }
    ];

    if (this.state.makeGanttCharts)
      formFields.push({name: "colorByAircraft", label: "Color Chart by Aircraft", type: "checkbox"});

    const theme = this.props.theme;

    return (
      <div>
        {!this.props.uploadedFile ?
          <div style={{margin: '3vh 0'}}>
            <div class="center-in-row" style={{textAlign: 'center'}}>
              <h1>Gate Assignment</h1>
            </div>
            <div class="center-in-row" style={{textAlign: 'center'}}>
              To see requirements for the upload file, visit this URL:
            </div>
            <div class="center-in-row" style={{marginBottom: '15px', textAlign: 'center'}}>
              <a target="_blank"
                 href="http://sfo-wiki02.flysfo.com:8090/display/DM/Full+Code+Documentation#FullCodeDocumentation-GateAssignment">
                Gate Assignment Documentation
              </a>
            </div>
            <div class="center-in-row">
              <div class="container-limit">
                <Card>
                  <form ref={form => this.form = form} onSubmit={this.handleSubmit}>
                    <div class="center-in-row">
                      <div class="center-in-column card-form">
                        <InputField theme={theme} formState={this.state} fields={formFields}
                                    onChange={this.handleChange}/>
                        <div class="flex-row">
                          <ExcelInput formState={this.state} onChange={this.handleChange}
                                      onFileUpload={this.fileUploadChange}/>
                        </div>
                      </div>
                    </div>
                    <input type="submit" style={{display: 'none'}}/>
                  </form>
                </Card>
                {this.props.uploadError !== '' &&
                <div class="center-in-row" style={{marginTop: '15px', textAlign: 'center'}}>
                  <span class="error-text">{this.props.uploadError}</span>
                </div>
                }
                <div style={{marginTop: '2.5vh'}} class="center-in-row">
                  <Button label="Run Gate Assignment" raised primary onClick={this.handleSubmit}/>
                </div>
                <div style={{marginTop: '1vh'}} class="center-in-row">
                  <Link to="/home" style={{fontSize: '0.8em'}}>Home</Link>
                </div>
              </div>
            </div>
          </div>
          :
          <SuccessMessage closeProcess={() => this.props.toggleUpload(false)}/>
        }
      </div>
    );
  }
}

export default Radium(GateAssignmentUploadForm);