import Touchable from '@/components/Touchable';
import {RootState} from '@/models/index';
import {ModalStackNavigation, ModalStackParamList} from '@/navigator/index';
import {RouteProp} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {useCallback} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import Icon from '@/assets/iconfont';
import PlaySlider from './PlaySlider';
import {viewportWidth} from '@/utils/index';
import LinearGradient from 'react-native-linear-gradient';

const mapStateToProps = ({player}: RootState) => {
  return {
    soundUrl: player.soundUrl,
    playState: player.playState,
    title: player.title,
    thumbnail: player.thumbnail,
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

const IMAGE_WIDTH = 180;
const SCALE = viewportWidth / IMAGE_WIDTH;

const Detail: React.FC<IProps> = ({
  route,
  dispatch,
  playState,
  title,
  thumbnail,
  navigation,
  previousId,
  nextId,
}) => {
  const [isBarrage, setIsBarrage] = useState(false);

  const anim = new Animated.Value(1);

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

  const barrage = useCallback(() => {
    setIsBarrage(!isBarrage);
    Animated.timing(anim, {
      toValue: isBarrage ? 1 : SCALE,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, [anim, isBarrage]);

  return (
    <View style={styles.container}>
      <View style={styles.imageView}>
        <Animated.Image
          source={{uri: thumbnail}}
          style={[
            styles.image,
            {
              transform: [
                {
                  scale: anim,
                },
              ],
            },
          ]}
        />
      </View>
      {isBarrage && (
        <LinearGradient
          colors={['rgba(128,104,102,0.5)', '#807c66']}
          style={styles.linear}
        />
      )}
      <Touchable style={styles.barrageBtn} onPress={barrage}>
        <Text style={styles.barrageText}>弹幕</Text>
      </Touchable>
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

const PADDING_TOP = (viewportWidth - IMAGE_WIDTH) / 2;

const styles = StyleSheet.create({
  container: {
    paddingTop: PADDING_TOP,
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
  imageView: {
    alignItems: 'center',
    height: IMAGE_WIDTH,
  },
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_WIDTH,
    borderRadius: 8,
    backgroundColor: '#ccc',
  },
  barrageBtn: {
    width: 40,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#fff',
    borderWidth: 1,
    marginLeft: 10,
  },
  barrageText: {
    color: '#fff',
  },
  linear: {
    position: 'absolute',
    top: 0,
    height: viewportWidth,
    width: viewportWidth,
  },
});

export default connector(Detail);
