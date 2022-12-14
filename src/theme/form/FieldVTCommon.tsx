import React from 'react';
import {FormBuilderContext} from '../../contexts/comment/FormBuilderContext';
import DateTimeInputVT from '../input/DateTimeInputVT';
import PhoneNumberInputVT from '../input/PhoneNumberInputVT';
import SelectInputVT from '../input/SelectInputVT';
import TextInputVT from '../input/TextInputVT';
import TextTagsInputVT from '../input/TextTagsInputVT';
import {InputVTProps} from './formbuilder';

export interface FieldVTCommonProps extends InputVTProps {
  nextInputKey: string;
}
export class FieldVTCommon extends React.Component<FieldVTCommonProps, {}> {
  ipRef = React.createRef<any>();
  static contextType = FormBuilderContext;

  componentDidMount() {
    const formBuilderCt: any = this.context;
    // console.log('formBuilderCt', formBuilderCt);
    formBuilderCt.setInputRef(this.props.inputKey, this.ipRef);
  }

  fTypeObject = {
    Text: () => {
      return <TextInputVT {...this.props} ref={this.ipRef} />;
    },
    PhoneNumber: () => {
      return <PhoneNumberInputVT {...this.props} ref={this.ipRef} />;
    },
    Select: () => {
      return <SelectInputVT {...this.props} ref={this.ipRef} />;
    },
    TextTags: () => {
      return <TextTagsInputVT {...this.props} ref={this.ipRef} />;
    },
    DateTime: () => {
      return <DateTimeInputVT {...this.props} ref={this.ipRef} />;
    },
    Peoples: () => {
      return null;
    },
    Range_Date: () => {
      return null;
    },
    Range_Number: () => {
      return null;
    },
    Files: () => {
      return null;
    },
    Tags: () => {
      return null;
    },
    Checkbox: () => {
      return null;
    },
  };
  render() {
    return <>{this.fTypeObject[this.props.type]()}</>;
  }
}
