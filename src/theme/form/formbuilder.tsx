import * as React from 'react';
import {View} from 'react-native';
import {useTheme, Button, InputProps, Theme} from '@rneui/themed';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {getObjectByKey} from '../../utils/arrayUtils';
import {FieldVTCommon} from './FieldVTCommon';
import {SelectOptionItemProps} from '../../globalUI/libs/SelectOptionSheet';
import {GlobalUIManager} from '../../globalUI';
import {FormBuilderProvider} from '../../contexts/comment/FormBuilderProvider';

export interface InputVTProps {
  type:
    | 'Text'
    | 'PhoneNumber'
    | 'Select'
    | 'TextTags'
    | 'Peoples'
    | 'Tags'
    | 'DateTime'
    | 'Range_Date'
    | 'Range_Number'
    | 'Files'
    | 'Checkbox';
  inputKey: string;
  validation?: any;
  initValue?: string;

  inputProps: InputProps & {
    theme?: Theme;
    dateTimeProps?: {
      mode: 'date' | 'time' | 'datetime'
    };
  };

  options?: () => Promise<SelectOptionItemProps[]>;
  multiple?: boolean;
}
type Props = {
  inputs: InputVTProps[];
};
export function FormBuilder({inputs}: Props) {
  const {theme} = useTheme();

  return (
    <Formik
      validationSchema={Yup.object().shape(
        getObjectByKey(inputs, 'inputKey', 'validation'),
      )}
      initialValues={getObjectByKey(inputs, 'inputKey', 'defaultValue')}
      onSubmit={(values: any) =>
        GlobalUIManager.view?.showSuccessFlashMsg({
          message: 'Success!',
          description: JSON.stringify(values),
          duration: 5000,
        })
      }>
      {({handleChange, handleBlur, handleSubmit, values, errors}) => (
        <View>
          <FormBuilderProvider>
            {inputs.map((inputParams: InputVTProps, index: number) => {
              const {inputProps, ...others} = inputParams;
              return (
                <FieldVTCommon
                  key={inputParams.inputKey}
                  inputProps={{
                    ...inputProps,
                    onChangeText: handleChange(inputParams.inputKey),
                    onBlur: handleBlur(inputParams.inputKey),
                    value: values[inputParams.inputKey],
                    errorMessage: errors[inputParams.inputKey],
                  }}
                  {...others}
                  nextInputKey={
                    index < inputs.length - 1 ? inputs[index + 1].inputKey : ''
                  }
                />
              );
            })}
          </FormBuilderProvider>
          <Button
            color={theme.colors.primary}
            title="Submit"
            onPress={handleSubmit}
          />
        </View>
      )}
    </Formik>
  );
}
