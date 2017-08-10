import React, {Component} from "react";
import Button from 'react-toolbox/lib/button/Button';


export default class SuccessMessage extends Component {
  render() {
    return (
      <div class="center-in-row">
        <div class="flex-column container-limit">
          <div class="center-in-row">
            <h1>File Successfully Uploaded!</h1>
          </div>
          <div class="center-in-row" style={{textAlign: 'center'}}>
            <p>Your file has been successfully uploaded and is being run.
              Please wait patiently for the results to arrive in your inbox before uploading a new file.</p>
          </div>
          <div class="center-in-row">
            <Button onClick={() => {
              this.props.closeProcess()
            }} label="Upload a New File" primary raised/>
          </div>
        </div>
      </div>
    )
  }
}