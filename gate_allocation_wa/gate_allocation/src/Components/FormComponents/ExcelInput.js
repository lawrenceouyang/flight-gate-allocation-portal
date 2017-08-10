import React, {Component} from 'react';
import Input from 'react-toolbox/lib/input/Input';
import Button from 'react-toolbox/lib/button/Button';

export default class ExcelInput extends Component {
  render() {
    const hiddenInputStyle = {
      opacity: 0,
      width: '0.1px',
      height: '0.1px',
      overflow: 'hidden',
      position: 'absolute',
      zIndex: -1
    };

    const {formState, onChange, onFileUpload} = this.props;

    return (
      <div class="flex-row" style={{flex: 6}}>
        <Input className="input-body"
               type="text"
               label="Excel File"
               name="filename"
               value={formState.filename}
               onChange={onChange.bind(this, 'filename')}
               required
               disabled
               error={formState.error['filename']}
        />
        <div class="center-in-column" style={{marginLeft: "20px"}}>
          <Button icon="file_upload" label="Upload File" raised accent onClick={() => {
            this.excelUploadLabel.click()
          }}/>
        </div>
        <label for="excel" ref={label => this.excelUploadLabel = label}/>
        <input id="excel" name="excel" style={hiddenInputStyle} type="file"
               accept=".xls, .xlsx"
               onChange={(e) => onFileUpload(e)}
        />
      </div>
    )
  }
}