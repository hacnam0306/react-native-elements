import React, {useState} from 'react';
import {BottomSheet, Button, ListItem} from '@rneui/themed';
import {StyleSheet} from 'react-native';
import {Header} from '../components/header';
import {GlobalUIManager} from '../globalUI';
import {faker} from '@faker-js/faker';
import {getSelectOptions} from '../faker/selectOptionsFaker';

type BottomSheetComponentProps = {};

const BottomSheetComponent: React.FunctionComponent<
  BottomSheetComponentProps
> = () => {
  const [isVisible, setIsVisible] = useState(false);
  const list = [
    {title: 'List Item 1'},
    {title: 'List Item 2'},
    {
      title: 'Cancel',
      containerStyle: {backgroundColor: 'red'},
      titleStyle: {color: 'white'},
      onPress: () => setIsVisible(false),
    },
  ];

  return (
    <>
      <Header title="BottomSheet" view="bottomsheet" />
      <Button
        title="Open From GlobalUI"
        onPress={() =>
          GlobalUIManager.view?.showBottomActionSheet('Select Once', [
            {
              title: faker.lorem.text(),
              leftIcon: {
                name: 'check',
                size: 20,
              },
            },
            {
              title: faker.lorem.text(),
              leftIcon: {
                name: 'map-marker',
                type: 'font-awesome',
                color: '#86939e',
                size: 25,
              },
            },
          ])
        }
        buttonStyle={styles.button}
      />
      <Button
        title="Open Bottom Sheet - SelectOptions"
        onPress={() =>
          GlobalUIManager.view?.showSelectOptionSheet(faker.lorem.words(), () =>
            getSelectOptions(20),
            // onSelect
          )
        }
        buttonStyle={styles.button}
      />
      <Button
        title="Open Bottom Sheet with handler"
        onPress={() => setIsVisible(true)}
        buttonStyle={styles.button}
      />
      <BottomSheet
        modalProps={{}}
        onBackdropPress={() => setIsVisible(false)}
        isVisible={isVisible}>
        {list.map((l, i) => (
          <ListItem
            key={i}
            containerStyle={l.containerStyle}
            onPress={l.onPress}>
            <ListItem.Content>
              <ListItem.Title
                numberOfLines={2}
                ellipsizeMode={'tail'}
                style={l.titleStyle}>
                {l.title}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 10,
  },
});

export default BottomSheetComponent;
