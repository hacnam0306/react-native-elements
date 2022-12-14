import {faker} from '@faker-js/faker';
import {Text} from '@rneui/themed';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {GlobalUIManager} from '../../globalUI';
import {SelectOptionItemProps} from '../../globalUI/libs/SelectOptionSheet';
import TextInputVT, {TextInputVTProps, TextInputVTState} from './TextInputVT';
import flags from '../../config/flags';
import {moderateScaleTheme} from '../../utils/scaleDimensions';
import {phone} from 'phone';

interface PhoneNumberInputVTProps extends TextInputVTProps {}
interface PhoneNumberInputVTState extends TextInputVTState {}
class PhoneNumberInputVT<
  PhoneNumberInputVTProps,
  PhoneNumberInputVTState,
> extends TextInputVT {
  state = {
    dial_code: phone(this.props.inputProps.value || '').countryCode || '+84',
    flag: '🇻🇳',
  };

  _getListContry = (): Promise<SelectOptionItemProps[]> => {
    return new Promise((resolve: any) => {
      resolve(
        flags.map(ct => {
          return {
            value: {
              dial_code: ct.dial_code,
              flag: ct.flag,
            },
            title: ct.name,
            leftIcon: () => <Text>{ct.flag}</Text>,
          };
        }),
      );
    });
  };

  _onShowSelectContry = () => {
    GlobalUIManager.view?.showSelectOptionSheet(
      faker.lorem.words(),
      this._getListContry,
      this._onSelectCountry,
      [],
      false,
      () => {},
    );
  };

  _onSelectCountry = (vJson: string) => {
    const countryVal = JSON.parse(vJson)[0];
    const oldDialCode = this.state.dial_code;
    this.setState({
      flag: countryVal.value.flag,
      dial_code: countryVal.value.dial_code,
    });
    if (this.props.inputProps.onChangeText)
      this.props.inputProps.onChangeText(
        (this.props.inputProps.value || '').replace(
          oldDialCode || '',
          countryVal.value.dial_code,
        ),
      );
  };

  clearInput = () => {};

  focus = () => {
    console.log('_handleNextInputFocus 2', this.props.inputKey);
    this.inputRef.current?.focus();
  };

  RenderLeftIcon = () => {
    const {dial_code, flag} = this.state;
    return (
      <TouchableOpacity
        onPress={this._onShowSelectContry}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: moderateScaleTheme(15),
        }}>
        <Text>
          {flag} {dial_code}
        </Text>
      </TouchableOpacity>
    );
  };

  onChangeText = (text: string) => {
    !!this.props.inputProps.onChangeText &&
      this.props.inputProps.onChangeText(`${this.state.dial_code}${text}`);
  };

  formatValue = () => {
    return (this.props.inputProps.value || '').replace(
      this.state.dial_code,
      '',
    );
  };
}

export default PhoneNumberInputVT;
