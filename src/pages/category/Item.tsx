import {ICategory} from '@/models/category';
import React from 'react';
import {Text, View} from 'react-native';
import {viewportWidth} from '@/utils/index';
import {StyleSheet} from 'react-native';

interface IProps {
  data: ICategory;
}

const parentWidth = viewportWidth - 10;
const itemWidth = parentWidth / 4;

const Item: React.FC<IProps> = ({data}) => {
  return (
    <View key={data.id} style={styles.itemWrapper}>
      <View style={styles.item}>
        <Text>{data.name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemWrapper: {
    width: itemWidth,
    height: 48,
  },
  item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 4,
  },
});

export default Item;