import Touchable from '@/components/Touchable';
import {RootState} from '@/models/index';
import {ModalStackNavigation, ModalStackParamList} from '@/navigator/index';
import {RouteProp} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import Icon from '@/assets/iconfont';
import PlaySlider from './PlaySlider';

const mapStateToProps = ({player}: RootState) => {
  return {
    soundUrl: player.soundUrl,
    playState: player.playState,
    title: player.title,
    previousId: player.previousId,
    nextId: player.nextId,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  navigation: ModalStackNavigation;
  route: RouteProp<ModalStackParamList, 'Detail'>;
}
const Detail: React.FC<IProps> = ({
  route,
  dispatch,
  playState,
  title,
  navigation,
  previousId,
  nextId,
}) => {
  useEffect(() => {
    dispatch({
      type: 'player/fetchShow',
      payload: {
        id: route.params.id,
      },
    });
  }, [dispatch, route.params.id]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: title,
    });
  }, [navigation, title]);

  const toggle = useCallback(() => {
    dispatch({
      type: playState === 'playing' ? 'player/pause' : 'player/play',
    });
  }, [dispatch, playState]);

  const previous = useCallback(() => {
    dispatch({
      type: 'player/previous',
    });
  }, [dispatch]);

  const next = useCallback(() => {
    dispatch({
      type: 'player/next',
    });
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <PlaySlider />
      <View style={styles.control}>
        <Touchable
          disabled={!previousId}
          onPress={previous}
          style={styles.button}>
          <Icon name="icon-shangyishou" size={30} color="#fff" />
        </Touchable>
        <Touchable onPress={toggle} style={styles.button}>
          <Icon
            name={playState === 'playing' ? 'icon-paste' : 'icon-bofang'}
            size={40}
            color="#fff"
          />
        </Touchable>
        <Touchable disabled={!nextId} onPress={next} style={styles.button}>
          <Icon name="icon-xiayishou" size={30} color="#fff" />
        </Touchable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
  },
  control: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
    marginHorizontal: 90,
  },
  button: {
    marginHorizontal: 10,
  },
});

export default connector(Detail);
