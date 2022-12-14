import moment from 'moment';
import React, {useState} from 'react';
import DatePicker, {DatePickerProps} from 'react-native-date-picker';
import {getFormatByDateMode} from '../../config/app';

let _onChangeValue: ((dateStr: string) => void) | undefined;
export const DateTimePickerModal = React.forwardRef((props, ref) => {
  React.useImperativeHandle(ref, () => ({
    show,
  }));
  const show = (
    datePickerProps: DatePickerProps,
    onConfrimDate?: (dateStr: string) => void,
  ) => {
    setPickerProps(datePickerProps);
    _onChangeValue = onConfrimDate;
    setDate(new Date(datePickerProps.date));
    setIsOpen(true);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [pickerProps, setPickerProps] = useState<DatePickerProps>();

  const onDateChange = (date: Date) => {
    setDate(date);
  };
  const onConfirm = (date: Date) => {
    !!_onChangeValue &&
      _onChangeValue(
        moment(date).format(getFormatByDateMode(pickerProps?.mode)),
      );
    setIsOpen(false);
  };
  const onCancel = () => {
    setIsOpen(false);
  };

  return (
    <DatePicker
      modal
      open={isOpen}
      date={date}
      onDateChange={onDateChange}
      onConfirm={onConfirm}
      onCancel={onCancel}
      {...pickerProps}
    />
  );
});
