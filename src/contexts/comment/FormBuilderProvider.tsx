import React from 'react';
import {FormBuilderContext} from './FormBuilderContext';

export interface IFormBuilderState {
  inputRefs: {[x: string]: any};
}
export class FormBuilderProvider extends React.Component<
  {},
  IFormBuilderState
> {
  state = {
    inputRefs: {},
  };

  _showNextInput = (nextInputKey: string) => {
    console.log('_showNextInput', this.state.inputRefs[nextInputKey]);
    if (!!this.state.inputRefs && !!this.state.inputRefs[nextInputKey])
      this.state.inputRefs[nextInputKey].current?.focus();
  };

  _setInputRef = (inputKey: string, ref: any) => {
    this.setState(oldState => {
      return {
        inputRefs: {
          ...oldState.inputRefs,
          [inputKey]: ref,
        },
      };
    });
  };

  render(): React.ReactNode {
    return (
      <FormBuilderContext.Provider
        value={{
          showNextInput: this._showNextInput,
          setInputRef: this._setInputRef,
        }}>
        {this.props.children}
      </FormBuilderContext.Provider>
    );
  }
}
