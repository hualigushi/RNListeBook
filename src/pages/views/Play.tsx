import Touchable from '@/components/Touchable';
import React, {useCallback, useEffect, useRef} from 'react';
import {Animated, Easing, Image, StyleSheet} from 'react-native';
import Icon from '@/assets/iconfont';
import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';
import Progress from './Progress';

const mapStateToProps = ({player}: RootState) => {
  return {
    thumbnailUrl: player.thumbnailUrl,
    playState: player.playState,
  };
};

const connector = connect(mapStateToProps);
type ModelState = ConnectedProps<typeof connector>;

interface Iprops extends ModelState {
  onPress: () => void;
}

const Play: React.FC<Iprops> = ({thumbnailUrl, playState, onPress}) => {
  const anim = useRef(new Animated.Value(0)).current;
  let rotate = useRef<any>('0deg');
  let timing = useRef<any>(null);

  timing.current = Animated.loop(
    Animated.timing(anim, {
      toValue: 1,
      duration: 10000,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
    {iterations: -1},
  );

  rotate.current = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const onPlayPress = useCallback(() => {
    if (thumbnailUrl && onPress) {
      onPress();
    }
  }, [onPress, thumbnailUrl]);

  useEffect(() => {
    if (timing.current && rotate.current && playState === 'playing') {
      timing.current.start();
    } else if (timing.current && rotate.current && playState === 'paused') {
      timing.current.stop();
    }
  }, [playState]);

  return (
    <Touchable style={styles.play} onPress={onPlayPress}>
      <Progress>
        <Animated.View
          style={{
            transform: [
              {
                rotate: rotate.current,
              },
            ],
          }}>
          {thumbnailUrl ? (
            <Image
              style={styles.image}
              source={{
                uri: thumbnailUrl,
              }}
            />
          ) : (
            <Icon name="icon-bofang3" color="#ededed" size={40} />
          )}
        </Animated.View>
      </Progress>
    </Touchable>
  );
};
const styles = StyleSheet.create({
  play: {
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
});
export default connector(Play);
