import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {StyleSheet, Text, View, Image, Animated} from 'react-native';
import {useHeaderHeight} from '@react-navigation/stack';
import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';
import {RootStackParamList} from '@/navigator/index';
import {RouteProp} from '@react-navigation/native';
import CorverRight from '@/assets/cover-right.png';
import {BlurView} from '@react-native-community/blur';
import Tab from './Tab';
import {
  PanGestureHandler,
  PanGestureHandlerStateChangeEvent,
  State,
} from 'react-native-gesture-handler';
import {viewportHeight} from '@/utils/index';

const mapStateToProps = ({album}: RootState) => {
  return {
    summary: album.summary,
    author: album.author,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;
interface IProps extends ModelState {
  route: RouteProp<RootStackParamList, 'Album'>;
}
const USE_NATIVE_DRIVER = true;
const HEADER_HEIGHT = 260; // 频道信息头部高度

const Album: React.FC<IProps> = ({dispatch, route, summary, author}) => {
  const headerHeight = useHeaderHeight();
  const translationValue = useRef(0);

  const translationYY = new Animated.Value(0);
  const translationYOffset = new Animated.Value(0);
  const translateY = Animated.add(translationYY, translationYOffset);

  const RANGE = [-(HEADER_HEIGHT - headerHeight), 0];

  useEffect(() => {
    const {id} = route.params.item;
    dispatch({
      type: 'album/fetchAlbum',
      payload: {
        id,
      },
    });
    // // 时间函数：作用是推动一个值按照缓动曲线随着时间变化
    // Animated.timing(translateY, {
    //   toValue: -170,
    //   duration: 3000, // 在3秒将translateY有0改为-170
    //   useNativeDriver: true,
    // }).start();
  }, [dispatch, route.params.item]);

  // 在手指拖动时一直触发
  // Animated.event 用来映射动画值
  const onGestureEvent = Animated.event(
    [{nativeEvent: {translationY: translationYY}}],
    {
      useNativeDriver: USE_NATIVE_DRIVER, // 启动原生动画，性能更好
    },
  );

  // 手势状态发生变化时回调
  const onHandlerStateChange = useCallback(
    ({nativeEvent}: PanGestureHandlerStateChangeEvent) => {
      // 离开之前的上一次状态是活动的
      if (nativeEvent.oldState === State.ACTIVE) {
        let {translationY} = nativeEvent;
        // Animated.Value
        // value
        // offset = value
        translationYOffset.extractOffset();
        translationYOffset.setValue(translationY);
        translationYOffset.flattenOffset();
        // value = value + offset
        translationYY.setValue(0);
        translationValue.current = translationValue.current + translationY;
        if (translationValue.current < RANGE[0]) {
          translationValue.current = RANGE[0];
          Animated.timing(translationYOffset, {
            toValue: RANGE[0],
            duration: 1000,
            useNativeDriver: USE_NATIVE_DRIVER,
          }).start();
        } else if (translationValue.current > RANGE[1]) {
          translationValue.current = RANGE[1];
          Animated.timing(translationYOffset, {
            toValue: RANGE[1],
            duration: 1000,
            useNativeDriver: USE_NATIVE_DRIVER,
          }).start();
        }
      }
    },
    [RANGE, translationYOffset, translationYY],
  );

  const renderHeader = useMemo(() => {
    const {title, image} = route.params.item;
    if (!image || !author.avatar) {
      return null;
    }
    return (
      <View style={[styles.header, {paddingTop: headerHeight}]}>
        <Image source={{uri: image}} style={styles.background} />
        <BlurView
          blurType="light"
          blurAmount={5}
          style={StyleSheet.absoluteFillObject}
        />
        <View style={styles.leftView}>
          <Image style={styles.thumbnail} source={{uri: image}} />
          <Image style={styles.coverRight} source={CorverRight} />
        </View>
        <View style={styles.rightView}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.summary}>
            <Text numberOfLines={1} style={styles.summaryText}>
              {summary}
            </Text>
          </View>
          <View style={styles.author}>
            <Image source={{uri: author.avatar}} style={styles.avatar} />
            <Text style={styles.name}>{author.name}</Text>
          </View>
        </View>
      </View>
    );
  }, [author.avatar, author.name, headerHeight, route.params.item, summary]);

  return (
    // PanGestureHandler 专门监听拖动手势组件，
    // onGestureEvent 在手指触碰时会一直触发
    <PanGestureHandler
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onHandlerStateChange}>
      <Animated.View
        style={[
          styles.container,
          {
            transform: [
              {
                translateY: translateY.interpolate({
                  inputRange: RANGE,
                  outputRange: RANGE,
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        ]}>
        {renderHeader}
        <View style={{height: viewportHeight - headerHeight}}>
          <Tab />
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#eee',
  },
  leftView: {
    marginRight: 26,
  },
  thumbnail: {
    width: 98,
    height: 98,
    borderColor: '#fff',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  coverRight: {
    height: 98,
    position: 'absolute',
    right: -23,
    resizeMode: 'contain',
  },
  rightView: {
    flex: 1,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
  },
  summary: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 10,
    marginVertical: 10,
    borderRadius: 4,
  },
  summaryText: {
    color: '#fff',
  },
  author: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  avatar: {
    height: 26,
    width: 26,
    borderRadius: 13,
    marginRight: 8,
  },
  name: {
    color: '#fff',
  },
});

export default connector(Album);
