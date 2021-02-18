import {RootState} from '@/models/index';
import {IProgram} from '@/models/album';
import React, {useCallback} from 'react';
import {Animated, ListRenderItemInfo, StyleSheet} from 'react-native';
import {NativeViewGestureHandler} from 'react-native-gesture-handler';
import {connect, ConnectedProps} from 'react-redux';
import Item from './Item';
import {ITabProps} from '../Tab';

const mapStateToProps = ({album}: RootState) => {
  return {
    list: album.list,
  };
};

const connector = connect(mapStateToProps);

type ModalState = ConnectedProps<typeof connector>;

type IProps = ModalState & ITabProps;

const List: React.FC<IProps> = ({
  list,
  panRef,
  tapRef,
  nativeRef,
  onScrollDrag,
  onItemPress,
}) => {
  const onPress = useCallback(
    (data: IProgram, index: number) => {
      console.log('onPress ~ data', data);
      onItemPress(data, index);
    },
    [onItemPress],
  );

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
    <NativeViewGestureHandler
      simultaneousHandlers={panRef}
      ref={nativeRef}
      waitFor={tapRef}>
      <Animated.FlatList
        style={styles.container}
        data={list}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        bounces={false}
        scrollEventThrottle={1}
        onScrollBeginDrag={onScrollDrag}
      />
    </NativeViewGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});
export default connector(List);
