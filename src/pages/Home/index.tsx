import React from 'react';
import {ListRenderItemInfo, View} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@/models/index';
import {RootStackNavigation} from '@/navigator/index';
import Carousel from './Carousel';
import {useEffect} from 'react';
import Guess from './Guess';
import {FlatList} from 'react-native-gesture-handler';
import {IChannel} from '@/models/home';
import ChannelItem from './ChannelItem';

const mapStateToProps = ({home, loading}: RootState) => ({
  carousels: home.carousels,
  channels: home.channels,
  loading: loading.effects['home/fetchCarousels'],
});
const connector = connect(mapStateToProps);
type ModelState = ConnectedProps<typeof connector>;
interface Iprops extends ModelState {
  navigation: RootStackNavigation;
}
const Home: React.FC<Iprops> = ({dispatch, carousels, channels}) => {
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
  return (
    <FlatList
      ListHeaderComponent={header}
      data={channels}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
    />
  );
};

export default connector(Home);
