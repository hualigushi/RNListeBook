import {viewportWidth} from '@/utils/index';
import React, {useEffect} from 'react';
import {Easing} from 'react-native';
import {Animated, Text} from 'react-native';
import {IBarrage} from '.';

interface Iprops {
  data: IBarrage;
  outside: (data: IBarrage) => void;
}
const Item: React.FC<Iprops> = ({data, outside}) => {
  const translateX = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: 10,
      duration: 6000,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start((finished) => {
      if (finished) {
        outside(data);
      }
    });

    // 监听弹幕的移动距离，超过1/3后，可以添加后面一条弹幕
    translateX.addListener(({value}) => {
      if (value > 3) {
        data.isFree = true;
      }
    });
  }, [data, outside, translateX]);
  const width = data.title.length * 15;
  return (
    <Animated.View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        position: 'absolute',
        top: data.trackIndex * 30,
        transform: [
          {
            translateX: translateX.interpolate({
              inputRange: [0, 10],
              outputRange: [viewportWidth, -width],
            }),
          },
        ],
      }}>
      <Text>{data.title} </Text>
    </Animated.View>
  );
};

export default Item;
