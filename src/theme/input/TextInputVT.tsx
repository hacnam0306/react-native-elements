import React from 'react';
import {Icon} from '@rneui/themed';
import {Input} from '@rneui/base/dist/Input/Input';
import {StyleSheet} from 'react-native';
import {moderateScaleTheme} from '../../utils/scaleDimensions';
import {FieldVTCommonProps} from '../form/FieldVTCommon';
import {FormBuilderContext} from '../../contexts/comment/FormBuilderContext';

export interface TextInputVTProps extends FieldVTCommonProps {}
export interface TextInputVTState {}
class TextInputVT extends React.Component<TextInputVTProps, TextInputVTState> {
  inputRef = React.createRef<Input>();
  RenderInputComponent?: any;
  RenderLeftIcon?: any;
  static contextType = FormBuilderContext;

  clear = () => {
    this.clearInput();
    !!this.props.inputProps.onChangeText &&
      this.props.inputProps.onChangeText('');
  };

  clearInput = () => {
    this.inputRef.current?.clear();
  };

  onSubmitEditing = () => {
    console.log('_handleNextInputFocus 1', this.props.nextInputKey);
    const formBuilderCt: any = this.context;
    // console.log('formBuilderCt', formBuilderCt);
    formBuilderCt.showNextInput(this.props.nextInputKey);
  };

  focus = () => {
    console.log('_handleNextInputFocus', 3, this.props.inputKey);
    this.inputRef.current?.focus();
  };

  onChangeText?: (text: string) => void = undefined;

  formatValue = () => {
    return this.props.inputProps.value;
  };

  render() {
    return (
      <Input
        ref={this.inputRef}
        containerStyle={styles.containerStyle}
        labelStyle={styles.labelStyle}
        inputContainerStyle={styles.inputContainerStyle}
        inputStyle={styles.inputStyle}
        errorStyle={styles.errorStyle}
        errorProps={{
          numberOfLines: 2,
          ellipsizeMode: 'tail',
        }}
        leftIcon={!!this.RenderLeftIcon ? this.RenderLeftIcon : undefined}
        rightIcon={
          !!this.props.inputProps.value && (
            <Icon onPress={this.clear} name="close" size={20} />
          )
        }
        InputComponent={
          !!this.RenderInputComponent ? this.RenderInputComponent : undefined
        }
        {...this.props.inputProps}
        value={this.formatValue()}
        onChangeText={
          !!this.onChangeText
            ? this.onChangeText
            : this.props.inputProps.onChangeText
        }
        onSubmitEditing={this.onSubmitEditing}
      />
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    paddingVertical: moderateScaleTheme(8),
  },
  inputContainerStyle: {
    borderBottomWidth: undefined,
    marginVertical: moderateScaleTheme(8),
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScaleTheme(15),
    borderColor: '#D9DCE0',
    borderWidth: moderateScaleTheme(1),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  labelStyle: {
    fontSize: moderateScaleTheme(14),
    lineHeight: moderateScaleTheme(19),
    color: '#09101D',
    margin: 0,
    marginLeft: moderateScaleTheme(10),
  },
  errorStyle: {
    fontSize: moderateScaleTheme(14),
    lineHeight: moderateScaleTheme(19),
    color: '#E24949',
    margin: 0,
  },
  inputStyle: {
    flex: 1,
    fontSize: moderateScaleTheme(16),
    lineHeight: moderateScaleTheme(22),
    fontWeight: '600',
    color: '#09101D',
    paddingVertical: moderateScaleTheme(13),
    paddingHorizontal: moderateScaleTheme(20),
    marginVertical: 0,
    marginHorizontal: 0,
    textDecorationStyle: undefined,
  },
});

export default TextInputVT;
