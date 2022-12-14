import React from 'react';

export interface FormBuilderContextProps {
  showNextInput: (nextInputKey: string) => void;
  setInputRef: (inputKey: string, ref: any) => void;
}
export const FormBuilderContext = React.createContext<FormBuilderContextProps>({
  showNextInput: (nextInputKey: string) => {},
  setInputRef: (inputKey: string, ref: any) => {},
});

export const FormBuilderConsumer = FormBuilderContext.Consumer
