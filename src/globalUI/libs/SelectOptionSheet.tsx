import * as React from 'react';
import {Keyboard, TouchableOpacity, View} from 'react-native';
import {Icon, IconProps, ListItem, useTheme, SearchBar} from '@rneui/themed';
import {Modalize} from 'react-native-modalize';
import {moderateScaleTheme} from '../../utils/scaleDimensions';
import {SelectOptionSleketon} from '../../theme/sleketon/SleketonSelectOption';

export interface SelectedItemProps {
  value: string;
  title: string;
}
export interface SelectOptionItemProps extends SelectedItemProps {
  leftIcon?: IconProps;
  subTitle?: string;
}
export interface SelectOptionSheetProps {}
export interface SelectOptionSheetState {}

let _onSelect: ((item: string) => void) | null = null;
let _onGetItems:
  | ((search?: string) => Promise<SelectOptionItemProps[]>)
  | null = null;
let _onSubmitEditing: (() => void) | null = null;
export const SelectOptionSheet = React.forwardRef((props, ref) => {
  React.useImperativeHandle(ref, () => ({
    show,
  }));
  const {theme} = useTheme();
  const modalizeRef = React.useRef<Modalize>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<string>('');
  const [items, setItems] = React.useState<SelectOptionItemProps[]>([]);
  const [selectedValues, setSelectedValues] = React.useState<
    SelectedItemProps[]
  >([]);
  const [search, setSearch] = React.useState<string>('');
  const [isMultiple, setIsMultiple] = React.useState<boolean>(false);

  const show = (
    title: string,
    getItems: (search?: string) => Promise<SelectOptionItemProps[]>,
    onSelect: ((item: string) => void) | undefined,
    selectedValues: SelectedItemProps[],
    multiple: boolean,
    onSubmitEditing: () => void,
  ) => {
    console.log('_handleNextInputFocus,show ', modalizeRef.current);
    Keyboard.dismiss();
    if (!!onSelect) _onSelect = onSelect;
    _onGetItems = getItems;
    _onSubmitEditing = onSubmitEditing;

    setIsLoading(true);
    setTitle(title);

    setSelectedValues(selectedValues || []);
    getData();
    setIsMultiple(!!multiple);

    console.log('_handleNextInputFocus,show open');
    modalizeRef.current?.open();
  };

  const getData = (str?: string) => {
    !!_onGetItems &&
      _onGetItems(str)
        .then((data: SelectOptionItemProps[]) => {
          console.log('SelectOptionSheet:data', data);
          setIsLoading(false);
          setItems(data);
        })
        .catch(err => {
          console.error('SelectOptionSheet:err', err);
        });
  };

  const close = () => {
    modalizeRef.current?.close();
  };

  const _onClose = () => {
    setIsLoading(false);
    setTitle('');
    setItems([]);
    _onSelect = null;
  };

  const onSelectItem = (item: SelectOptionItemProps) => {
    console.log('_onSelect onSelectItem', {
      item,
      selectedValues,
      concat: selectedValues.concat(item),
    });
    setSelectedValues(selectedValues.concat(item));
    if (!isMultiple) {
      onDone([item]);
    }
  };

  const onDone = (data?: SelectOptionItemProps[]) => {
    console.log('_onSelect onDone ', {data, selectedValues});
    close();
    !!_onSelect && _onSelect(JSON.stringify(data || selectedValues));
    !!_onSubmitEditing && _onSubmitEditing();
  };

  const _onSearch = (text: string) => {
    console.log('_onSearch 1', text);
    setSearch(text);
    getData(text);
  };

  const _renderItem = ({item}: any) => {
    const isSelected =
      selectedValues.findIndex(sel => sel.value == item.value) > -1;
    return !isLoading ? (
      <TouchableOpacity onPress={() => onSelectItem(item)}>
        <ListItem key={item.value.toString()} bottomDivider>
          {!!item.leftIcon && (
            <Icon
              {...item.leftIcon}
              color={isSelected ? theme.colors.primary : undefined}
            />
          )}
          <ListItem.Content>
            <ListItem.Title>{item.title}</ListItem.Title>
            {!!item.subTitle && (
              <ListItem.Subtitle>{item.subTitle}</ListItem.Subtitle>
            )}
          </ListItem.Content>
        </ListItem>
      </TouchableOpacity>
    ) : (
      <SelectOptionSleketon
        itemStyle={{
          marginBottom: moderateScaleTheme(15),
        }}
        numberRow={8}
      />
    );
  };

  return (
    <>
      <Modalize
        childrenStyle={{
          flex: 1,
        }}
        onClosed={_onClose}
        ref={modalizeRef}
        HeaderComponent={
          <View
            style={{
              // flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <SearchBar
              placeholder={title || 'Type Here...'}
              onChangeText={_onSearch}
              value={search}
              containerStyle={{
                flex: 1,
                backgroundColor: theme.colors.background,
                borderBottomWidth: 0,
                borderTopWidth: 0,
              }}
              inputContainerStyle={{
                backgroundColor: theme.colors.background,
              }}
            />
            {!!isMultiple && (
              <TouchableOpacity onPress={() => onDone()}>
                <Icon
                  color={
                    selectedValues.length > 0
                      ? theme.colors.primary
                      : theme.colors.grey0
                  }
                  name="done-all"
                  size={moderateScaleTheme(25)}
                />
              </TouchableOpacity>
            )}
          </View>
        }
        flatListProps={{
          data: items,
          renderItem: _renderItem,
          keyExtractor: item => `${item.value}-${item.title}`,
          showsVerticalScrollIndicator: false,
        }}
      />
      {!!isLoading &&
        new Array(10).fill(null).map((it, index) => {
          return (
            <SelectOptionSleketon
              key={index.toString()}
              itemStyle={{
                marginBottom: moderateScaleTheme(15),
              }}
              numberRow={8}
            />
          );
        })}
    </>
  );
});
