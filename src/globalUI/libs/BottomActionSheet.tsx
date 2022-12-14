import * as React from 'react';
import {Keyboard, TouchableOpacity, View} from 'react-native';
import {BottomSheet, Icon, IconProps, ListItem, useTheme} from '@rneui/themed';
import {moderateScaleTheme} from '../../utils/scaleDimensions';

export interface BottomActionItemProps {
  onPress?: () => void;
  leftIcon: IconProps;
  title?: string;
  subtitle?: string;
}
export interface NormalShowingState {
  visible: boolean;
}
export const BottomActionSheet = React.forwardRef((props, ref) => {
  React.useImperativeHandle(ref, () => ({
    show,
  }));
  const [title, setTitle] = React.useState<string>('');
  const [actions, setActions] = React.useState<BottomActionItemProps[]>([]);
  const [isVisible, setIsVisible] = React.useState(false);
  const {theme} = useTheme();

  const show = (title: string, items: BottomActionItemProps[]) => {
    Keyboard.dismiss();
    setTitle(title);
    setActions(items);
    setIsVisible(true);
  };

  return (
    <BottomSheet
      modalProps={{}}
      onBackdropPress={() => setIsVisible(false)}
      isVisible={isVisible}>
      <View
        style={{
          backgroundColor: theme.colors.background,
          paddingHorizontal: moderateScaleTheme(10),
        }}>
        <>
          <ListItem
            bottomDivider
            containerStyle={{
              justifyContent: 'space-between',
            }}>
            <ListItem.Title>{title}</ListItem.Title>
            <TouchableOpacity onPress={() => setIsVisible(false)}>
              <Icon name="close" size={moderateScaleTheme(20)} />
            </TouchableOpacity>
          </ListItem>
          {actions.map((action, i) => {
            return (
              <ListItem key={i.toString()} bottomDivider>
                <Icon {...action.leftIcon} />
                <ListItem.Content>
                  <ListItem.Title>{action.title}</ListItem.Title>
                  {!!action.subtitle && (
                    <ListItem.Subtitle>{action.subtitle}</ListItem.Subtitle>
                  )}
                </ListItem.Content>
              </ListItem>
            );
          })}
        </>
      </View>
    </BottomSheet>
  );
});
