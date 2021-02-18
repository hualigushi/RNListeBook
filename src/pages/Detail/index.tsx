import Touchable from '@/components/Touchable';
import {RootState} from '@/models/index';
import {ModalStackParamList} from '@/navigator/index';
import {RouteProp} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {useCallback} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import Icon from '@/assets/iconfont';
import PlaySlider from './PlaySlider';

const mapStateToProps = ({player}: RootState) => {
  return {
    soundUrl: player.soundUrl,
    playState: player.playState,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  route: RouteProp<ModalStackParamList, 'Detail'>;
}
const Detail: React.FC<IProps> = ({route, dispatch, playState}) => {
  useEffect(() => {
    dispatch({
      type: 'player/fetchShow',
      payload: {
        id: route.params.id,
      },
    });
  }, [dispatch, route.params.id]);

  const toggle = useCallback(() => {
    dispatch({
      type: playState === 'playing' ? 'player/pause' : 'player/play',
    });
  }, [dispatch, playState]);

  return (
    <View style={styles.container}>
      <Text>Detail</Text>
      <PlaySlider />
      <Touchable onPress={toggle}>
        <Icon
          name={playState === 'playing' ? 'icon-paste' : 'icon-bofang'}
          size={40}
          color="#fff"
        />
      </Touchable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
  },
});

export default connector(Detail);
