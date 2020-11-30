import React from 'react';
import {Button, Text, View} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@/models/index';
import {RootStackNavigation} from '@/navigator/index';
import Carousel from './Carousel';
import {useEffect} from 'react';

const mapStateToProps = ({home, loading}: RootState) => ({
  carousels: home.carousels,
  loading: loading.effects['home/fetchCarousels'],
});
const connector = connect(mapStateToProps);
type ModelState = ConnectedProps<typeof connector>;
interface Iprops extends ModelState {
  navigation: RootStackNavigation;
}
const Home: React.FC<Iprops> = ({dispatch, carousels}) => {
  useEffect(() => {
    dispatch({
      type: 'home/fetchCarousels',
    });
  }, [dispatch]);

  return (
    <View>
      <Carousel data={carousels} />
    </View>
  );
};

export default connector(Home);
