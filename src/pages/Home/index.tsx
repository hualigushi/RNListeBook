import React, {useCallback, useState} from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  NativeScrollEvent,
  StyleSheet,
  View,
} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@/models/index';
import {RootStackNavigation} from '@/navigator/index';
import Carousel, {sideHeight} from './Carousel';
import {useEffect} from 'react';
import Guess from './Guess';
import {IChannel} from '@/models/home';
import ChannelItem from './ChannelItem';
import {Text} from 'react-native';
import {NativeSyntheticEvent} from 'react-native';

const mapStateToProps = ({home, loading}: RootState) => ({
  carousels: home.carousels,
  channels: home.channels,
  hasMore: home.pagination.hasMore,
  gradientVisible: home.gradientVisible,
  loading: loading.effects['home/fetchCarousels'],
});
const connector = connect(mapStateToProps);
type ModelState = ConnectedProps<typeof connector>;
interface Iprops extends ModelState {
  navigation: RootStackNavigation;
}

const Home: React.FC<Iprops> = ({
  dispatch,
  channels,
  loading,
  hasMore,
  gradientVisible,
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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch({
      type: 'home/fetchChannels',
      callback: () => {
        setRefreshing(false);
      },
    });
  }, [dispatch]);

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

  // 页面往下滚动时，判断滚动距离是否超过轮播图高度，是则隐藏渐变色
  const onScroll = ({nativeEvent}: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = nativeEvent.contentOffset.y;
    let newGradientVisible = offsetY < sideHeight;
    if (gradientVisible !== newGradientVisible) {
      dispatch({
        type: 'home/setState',
        payload: {
          gradientVisible: newGradientVisible,
        },
      });
    }
  };

  const keyExtractor = (item: IChannel) => {
    return item.id;
  };

  const header = () => {
    return (
      <View>
        <Carousel />
        {/* 往上滚动时，猜你喜欢覆盖渐变色效果 */}
        <View style={styles.background}>
          <Guess />
        </View>
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
      onScroll={onScroll}
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
  background: {
    backgroundColor: '#fff',
  },
});
export default connector(Home);
