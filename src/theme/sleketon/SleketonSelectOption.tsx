import * as React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {Skeleton} from '@rneui/themed';

export const SelectOptionSleketon = ({
  numberRow,
  itemStyle,
}: {
  numberRow?: number;
  itemStyle?: StyleProp<ViewStyle>;
}) => {
  return (
    <>
      {new Array(numberRow || 5).fill(null).map((item, index) => {
        return (
          <View key={index.toString()} style={[styles.rowCenter, itemStyle]}>
            <Skeleton circle width={40} />
            <View style={[{marginLeft: 8, flexGrow: 1}]}>
              <Skeleton style={{marginBottom: 5}} />
              <View
                style={[styles.rowCenter, {justifyContent: 'space-between'}]}>
                <Skeleton height={8} width={90} />
                <Skeleton height={8} width={90} />
              </View>
            </View>
          </View>
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
