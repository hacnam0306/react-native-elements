import * as React from 'react';
import {Keyboard, TouchableOpacity, View} from 'react-native';
import {Button, Icon, Input, ListItem, useTheme} from '@rneui/themed';
import {Modalize} from 'react-native-modalize';
import {moderateScaleTheme} from '../../utils/scaleDimensions';

let _onSetValue: ((value: string) => void) | null = null;
export const SelectTagsSheet = React.forwardRef((props, ref) => {
  React.useImperativeHandle(ref, () => ({
    show,
  }));
  const modalizeRef = React.useRef<Modalize>();
  const [tags, setTags] = React.useState<string[]>([]);
  const [title, setTitle] = React.useState<string>('');
  const [text, setText] = React.useState<string>('');

  const {theme} = useTheme();

  const show = (
    title: string,
    items: string[],
    onSetValue: (value: string) => void,
  ) => {
    Keyboard.dismiss();
    setTitle(title);
    setTags(items);
    modalizeRef.current?.open();
    _onSetValue = onSetValue;
  };

  const _onChangeText = (text: string) => setText(text);

  const _onDone = () => {
    !!_onSetValue && _onSetValue(JSON.stringify(tags));
    modalizeRef.current?.close();
  };

  const _onAddItem = () => {
    if (!!text && tags.findIndex(t => t == text.trim()))
      setTags(tags.concat(text.trim()));
    setText('');
  };

  const _onRemoveItem = (text: string) => {
    setTags(tags.filter(t => t != text.trim()));
    setText('');
  };

  const _renderItem = ({item}: {item: string}) => (
    <ListItem
      bottomDivider
      containerStyle={{
        justifyContent: 'space-between',
      }}>
      <ListItem.Title>{item}</ListItem.Title>
      <TouchableOpacity onPress={() => _onRemoveItem(item)}>
        <Icon name="close" size={moderateScaleTheme(20)} />
      </TouchableOpacity>
    </ListItem>
  );

  return (
    <Modalize
      HeaderComponent={
        <View
          style={{
            // flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Input
            placeholder={title}
            style={{
              flex: 1,
            }}
            value={text}
            onChangeText={_onChangeText}
            rightIcon={
              <TouchableOpacity onPress={_onAddItem}>
                <Icon
                  color={theme.colors.primary}
                  name={'check'}
                  size={moderateScaleTheme(18)}
                />
              </TouchableOpacity>
            }
          />
        </View>
      }
      ref={modalizeRef}
      flatListProps={{
        data: tags,
        renderItem: _renderItem,
      }}
      FooterComponent={
        <Button color={theme.colors.primary} title="Done" onPress={_onDone} />
      }
    />
  );
});
