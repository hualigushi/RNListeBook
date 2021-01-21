import {RootState} from '@/models/index';
import {IProgram} from '@/models/album';
import React, {useCallback} from 'react';
import {ListRenderItemInfo, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {connect, ConnectedProps} from 'react-redux';
import Item from './Item';

const mapStateToProps = ({album}: RootState) => {
  return {
    list: album.list,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {}

const List: React.FC<IProps> = ({list}) => {
  const onPress = useCallback((data: IProgram) => {}, []);
  const renderItem = useCallback(
    ({item, index}: ListRenderItemInfo<IProgram>) => {
      return <Item data={item} index={index} onPress={onPress} />;
    },
    [onPress],
  );

  const keyExtractor = (item: IProgram) => {
    return item.id;
  };
  return (
    <FlatList
      style={styles.container}
      data={list}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});
export default connector(List);
