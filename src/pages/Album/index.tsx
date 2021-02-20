import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import {useHeaderHeight} from '@react-navigation/stack';
import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';
import {ModalStackNavigation, RootStackParamList} from '@/navigator/index';
import {RouteProp} from '@react-navigation/native';
import CorverRight from '@/assets/cover-right.png';
import {BlurView} from '@react-native-community/blur';
import Tab from './Tab';
import {
  NativeViewGestureHandler,
  PanGestureHandler,
  PanGestureHandlerStateChangeEvent,
  State,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import {viewportHeight} from '@/utils/index';
import {IProgram} from '@/models/album';

const mapStateToProps = ({album}: RootState) => {
  return {
    summary: album.summary,
    author: album.author,
    list: album.list,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;
interface IProps extends ModelState {
  headerHeight: number;
  navigation: ModalStackNavigation;
  route: RouteProp<RootStackParamList, 'Album'>;
}
const USE_NATIVE_DRIVER = true;
const HEADER_HEIGHT = 260; // 频道信息头部高度

const Album: React.FC<IProps> = ({
  dispatch,
  navigation,
  route,
  summary,
  author,
  list,
  headerHeight,
}) => {
  const tapRef = useRef<TapGestureHandler>(null);
  const panRef = useRef<PanGestureHandler>(null);
  const nativeRef = useRef<NativeViewGestureHandler>(null);

  const RANGE = [-(HEADER_HEIGHT - headerHeight), 0];

  const translationYValue = useRef(0);
  const lastScrollYValue = useRef(0);

  const translationYY = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(new Animated.Value(0)).current;
  const translationYOffset = useRef(new Animated.Value(0)).current;
  const reverseLastScrollY = useRef(
    Animated.multiply(useRef(new Animated.Value(-1)).current, lastScrollY),
  ).current;

  const translateY = useRef(
    Animated.add(
      Animated.add(translationYY, reverseLastScrollY),
      translationYOffset,
    ),
  ).current;

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

  useEffect(() => {
    if (list.length) {
      navigation.setParams({
        opacity: translateY.interpolate({
          inputRange: RANGE,
          outputRange: [1, 0],
        }),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 监听FlatList滚动
  const onScrollDrag = Animated.event(
    [{nativeEvent: {contentOffset: {y: lastScrollY}}}],
    {
      useNativeDriver: USE_NATIVE_DRIVER,
      listener: ({nativeEvent}: NativeSyntheticEvent<NativeScrollEvent>) => {
        lastScrollYValue.current = (nativeEvent as any).contentOffset.y;
      },
    },
  );

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
        translationY = translationY - lastScrollYValue.current;
        // Animated.Value
        // value
        // offset = value
        translationYOffset.extractOffset();
        translationYOffset.setValue(translationY);
        translationYOffset.flattenOffset();
        // value = value + offset
        translationYY.setValue(0);
        translationYValue.current = translationYValue.current + translationY;
        let maxDeltaY = -RANGE[0] - translationYValue.current;
        if (translationYValue.current < RANGE[0]) {
          translationYValue.current = RANGE[0];
          Animated.timing(translationYOffset, {
            toValue: RANGE[0],
            duration: 1000,
            useNativeDriver: USE_NATIVE_DRIVER,
          }).start();
          maxDeltaY = RANGE[1];
        } else if (translationYValue.current > RANGE[1]) {
          translationYValue.current = RANGE[1];
          Animated.timing(translationYOffset, {
            toValue: RANGE[1],
            duration: 1000,
            useNativeDriver: USE_NATIVE_DRIVER,
          }).start();
          maxDeltaY = -RANGE[0];
        }
        if (tapRef.current) {
          const tap: any = tapRef.current;
          tap.setNativeProps({
            maxDeltaY,
          });
        }
      }
    },
    [RANGE, translationYOffset, translationYY],
  );

  const onItemPress = useCallback(
    (data: IProgram, index: number) => {
      const previousItem: IProgram = list[index - 1];
      const nextItem: IProgram = list[index + 1];
      dispatch({
        type: 'player/setState',
        payload: {
          previousId: previousItem && previousItem.id,
          nextId: nextItem && nextItem.id,
          title: data.title,
          thumbnail: route.params.item.image,
          sounds: list.map((item) => ({id: item.id, title: item.title})),
        },
      });
      navigation.navigate('Detail', {
        id: data.id,
      });
    },
    [dispatch, list, navigation, route.params.item.image],
  );

  const renderHeader = useMemo(() => {
    const {title, image} = route.params.item;
    if (!image || !author.avatar) {
      return <View style={[styles.header, {paddingTop: headerHeight}]} />;
    }
    return (
      <View style={[styles.header, {paddingTop: headerHeight}]}>
        <Image source={{uri: image}} style={styles.background} />
        <BlurView
          blurType="light"
          blurAmount={10}
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
    <TapGestureHandler ref={tapRef} maxDeltaY={-RANGE[0]}>
      <View style={styles.container} pointerEvents="box-none">
        {/* PanGestureHandler 专门监听拖动手势组件，
    onGestureEvent 在手指触碰时会一直触发 */}
        <PanGestureHandler
          ref={panRef}
          simultaneousHandlers={[tapRef, nativeRef]}
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
              <Tab
                panRef={panRef}
                tapRef={tapRef}
                nativeRef={nativeRef}
                onScrollDrag={onScrollDrag}
                onItemPress={onItemPress}
              />
            </View>
          </Animated.View>
        </PanGestureHandler>
      </View>
    </TapGestureHandler>
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
  tab: {
    backgroundColor: '#fff',
  },
});

const Wrapper: React.FC<IProps> = (props: IProps) => {
  const headerHeight = useHeaderHeight();
  return <Album {...props} headerHeight={headerHeight} />;
};

export default connector(Wrapper);
