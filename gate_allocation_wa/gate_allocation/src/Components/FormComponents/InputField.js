import React, {Component} from 'react';
import Checkbox from 'react-toolbox/lib/checkbox/Checkbox';
import Input from 'react-toolbox/lib/input/Input';
import Slider from 'react-toolbox/lib/slider/Slider';

export default class InputField extends Component {
  render() {
    const {theme, formState, fields, onChange} = this.props;
    return (
      <div>
        {fields.map((field, i) => {
          switch (field.type) {
            case 'slider':
              return (
                <div class="flex-row" key={i}>
                  <div class={theme.RTInput.input} style={{flex: 1}}>
                    <div class={`${theme.RTInput.filled} ${theme.RTInput.inputElement}`}
                         style={{borderBottom: 'none'}}>
                      <Slider className="full-width" tabindex="-1"
                              value={formState[field.name]}
                              min={field.min}
                              max={field.max}
                              snaps
                              step={field.step}
                              onChange={onChange.bind(this, field.name)}
                              editable/>
                    </div>
                    <label class={`${theme.RTInput.label}`} for={field.name}>{field.label}</label>
                  </div>
                </div>
              );
            case 'checkbox':
              return (
                <div class="center-in-row" key={i}>
                  <Checkbox checked={formState[field.name]}
                            label={field.label}
                            onChange={onChange.bind(this, field.name)}
                  />
                </div>
              );
            default:
              return (
                <div class="flex-row" key={i}>
                  <Input className="full-width"
                         type={field.type}
                         label={field.label}
                         name={field.name}
                         value={formState[field.name]}
                         onChange={onChange.bind(this, field.name)}
                         maxLength={field.maxLength}
                         required
                         error={formState.error[field.name]}
                  />
                </div>
              );
          }
        })}
      </div>
    )
  }
}