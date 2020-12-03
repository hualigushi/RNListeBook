import React, {useState} from 'react';
import {ListRenderItemInfo, StyleSheet, View} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@/models/index';
import {RootStackNavigation} from '@/navigator/index';
import Carousel from './Carousel';
import {useEffect} from 'react';
import Guess from './Guess';
import {FlatList} from 'react-native-gesture-handler';
import {IChannel} from '@/models/home';
import ChannelItem from './ChannelItem';
import {Text} from 'react-native';

const mapStateToProps = ({home, loading}: RootState) => ({
  carousels: home.carousels,
  channels: home.channels,
  hasMore: home.pagination.hasMore,
  loading: loading.effects['home/fetchCarousels'],
});
const connector = connect(mapStateToProps);
type ModelState = ConnectedProps<typeof connector>;
interface Iprops extends ModelState {
  navigation: RootStackNavigation;
}

const Home: React.FC<Iprops> = ({
  dispatch,
  carousels,
  channels,
  loading,
  hasMore,
}) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    dispatch({
      type: 'home/fetchCarousels',
    });
    dispatch({
      type: 'home/fetchChannels',
    });
  }, [dispatch]);

  const onPress = (data: IChannel) => {
    console.log(data);
  };

  const onRefresh = () => {
    console.log('onRefresh---');
    setRefreshing(true);
    dispatch({
      type: 'home/fetchChannels',
      callback: () => {
        setRefreshing(false);
      },
    });
  };

  // 加载更多
  const onEndReached = () => {
    if (loading || !hasMore) {
      return;
    }
    dispatch({
      type: 'home/fetchChannels',
      payload: {
        loadMore: true,
      },
    });
  };

  const renderItem = ({item}: ListRenderItemInfo<IChannel>) => {
    return <ChannelItem data={item} onPress={onPress} />;
  };

  const keyExtractor = (item: IChannel) => {
    return item.id;
  };

  const header = () => {
    return (
      <View>
        <Carousel data={carousels} />
        <Guess />
      </View>
    );
  };

  const footer = () => {
    if (!hasMore) {
      return (
        <View style={styles.end}>
          <Text>--我是有底线的--</Text>
        </View>
      );
    }

    if (loading && hasMore && channels.length > 0) {
      return (
        <View style={styles.loading}>
          <Text>--正在加载中--</Text>
        </View>
      );
    }

    return <></>;
  };

  const empty = () => {
    if (loading) {
      return <></>;
    }
    return (
      <View style={styles.empty}>
        <Text>暂无数据</Text>
      </View>
    );
  };
  return (
    <FlatList
      ListHeaderComponent={header}
      ListFooterComponent={footer}
      ListEmptyComponent={empty}
      data={channels}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onRefresh={onRefresh}
      refreshing={refreshing}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.2}
    />
  );
};

const styles = StyleSheet.create({
  end: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  loading: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 100,
  },
});
export default connector(Home);
