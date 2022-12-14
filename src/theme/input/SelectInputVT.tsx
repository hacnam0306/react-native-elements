import {faker} from '@faker-js/faker';
import {Icon, Text} from '@rneui/themed';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {GlobalUIManager} from '../../globalUI';
import {SelectedItemProps} from '../../globalUI/libs/SelectOptionSheet';
import {moderateScaleTheme} from '../../utils/scaleDimensions';
import TextInputVT, {TextInputVTProps} from './TextInputVT';

interface SelectInputVTProps extends TextInputVTProps {}
class SelectInputVT extends TextInputVT {
  constructor(props: SelectInputVTProps) {
    super(props);
  }

  _onShowSelect = () => {
    console.log('_handleNextInputFocus _onShowSelect', this.props.options);
    if (!!this.props.options)
      GlobalUIManager.view?.showSelectOptionSheet(
        faker.lorem.words(),
        this.props.options,
        this.props.inputProps.onChangeText,
        !!this.props.inputProps.value
          ? JSON.parse(this.props.inputProps.value)
          : [],
        !!this.props.multiple,
        this.onSubmitEditing,
      );
  };

  clearInput = () => {};

  focus = () => {
    console.log('_handleNextInputFocus 2', this.props.inputKey);
    this._onShowSelect();
  };

  RenderInputComponent = (props: any) => {
    const {style, value} = props;
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
          {!!value
            ? JSON.parse(value)
                .map((vl: SelectedItemProps) => vl.title)
                .join(', ')
            : '---Select One---'}
        </Text>
        <Icon name="keyboard-arrow-down" />
      </TouchableOpacity>
    );
  };
}

export default SelectInputVT;
