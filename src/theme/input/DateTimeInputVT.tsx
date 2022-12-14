import {Icon, Text} from '@rneui/themed';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {GlobalUIManager} from '../../globalUI';
import {moderateScaleTheme} from '../../utils/scaleDimensions';
import TextInputVT, {TextInputVTProps} from './TextInputVT';
import moment from 'moment';
import {
  getFormatByDateMode,
} from '../../config/app';

interface DateTimeInputVTProps extends TextInputVTProps {}
class DateTimeInputVT extends TextInputVT {
  constructor(props: DateTimeInputVTProps) {
    super(props);
  }

  _onShowSelect = () => {
    GlobalUIManager.view?.showDateTimePicker(
      {
        date: !!this.props.inputProps.value
          ? new Date(this.props.inputProps.value)
          : new Date(),
        mode: this.props.inputProps.dateTimeProps?.mode || 'datetime',
      },
      this.props.inputProps.onChangeText,
    );
  };

  clearInput = () => {};

  focus = () => {
    console.log('_handleNextInputFocus 2', this.props.inputKey);
    this._onShowSelect();
  };

  RenderInputComponent = (props: any) => {
    const {style, value, placeholder} = props;
    return (
      <TouchableOpacity
        onPress={this._onShowSelect}
        style={[
          style,
          {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          },
        ]}>
        <Text
          style={{
            fontSize: moderateScaleTheme(16),
            lineHeight: moderateScaleTheme(22),
            fontWeight: '600',
            color: '#09101D',
          }}>
          {moment(value).format(
            getFormatByDateMode(this.props.inputProps.dateTimeProps?.mode),
          )}
        </Text>
        <Icon name="calendar-today" />
      </TouchableOpacity>
    );
  };
}

export default DateTimeInputVT;
