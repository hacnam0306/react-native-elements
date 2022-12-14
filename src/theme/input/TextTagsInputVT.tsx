import {Icon, Text} from '@rneui/themed';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {moderateScaleTheme} from '../../utils/scaleDimensions';
import TextInputVT from './TextInputVT';
import {GlobalUIManager} from '../../globalUI';

class TextTagsInputVT extends TextInputVT {
  _onShowModal = () => {
    if (!!this.props.inputProps.onChangeText)
      GlobalUIManager.view?.showSelectTagsSheet(
        '',
        JSON.parse(this.props.inputProps?.value || '[]'),
        this.props.inputProps.onChangeText,
      );
  };

  clearInput = () => {};

  focus = () => {
    this._onShowModal();
  };

  _renderTagsSelected = () => (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}>
      {JSON.parse(this.props.inputProps.value || '[]').map((text: string) => {
        return (
          <>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#F1F4F7',
                paddingHorizontal: moderateScaleTheme(10),
                paddingVertical: moderateScaleTheme(5),
                borderRadius: moderateScaleTheme(10),
                marginVertical: moderateScaleTheme(5),
                marginRight: moderateScaleTheme(5),
              }}>
              <Text
                style={{
                  color: '#09101D',
                  fontSize: moderateScaleTheme(16),
                  lineHeight: moderateScaleTheme(22),
                  textAlignVertical: 'center',
                  marginRight: moderateScaleTheme(5),
                  fontWeight: '600',
                }}>
                {text}
              </Text>
              <Icon
                color={'#BDBDBE'}
                name="close"
                size={moderateScaleTheme(18)}
              />
            </View>
          </>
        );
      })}
    </View>
  );

  RenderInputComponent = (props: any) => {
    const {style, value} = props;
    return (
      <>
        <TouchableOpacity
          onPress={this._onShowModal}
          style={[
            style,
            {
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            },
          ]}>
          {this._renderTagsSelected()}
        </TouchableOpacity>
      </>
    );
  };
}

export default TextTagsInputVT;
