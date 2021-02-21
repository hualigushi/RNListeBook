import Touchable from '@/components/Touchable';
import {RootState} from '@/models/index';
import {ModalStackNavigation, ModalStackParamList} from '@/navigator/index';
import {RouteProp} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {useCallback} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import Icon from '@/assets/iconfont';
import PlaySlider from './PlaySlider';
import {viewportWidth} from '@/utils/index';
import LinearGradient from 'react-native-linear-gradient';
import Barrage, {Message} from '@/components/Barrage';

const data: string[] = [
  '最灵繁的人也看不见自己的背脊',
  '朝闻道，夕死可矣',
  '阅读是人类进步的阶梯',
  '内外相应，言行相称',
  '人的一生是短的',
  '抛弃时间的人，时间也抛弃他',
  '自信在于沉稳',
  '过犹不及',
  '开卷有益',
  '有志者事竟成',
  '合理安排时间，就等于节约时间',
  '成功源于不懈的努力',
];

function randomIndex(length: number) {
  return Math.floor(Math.random() * length);
}

function getText() {
  return data[randomIndex(data.length)];
}

const mapStateToProps = ({player}: RootState) => {
  return {
    id: player.id,
    soundUrl: player.soundUrl,
    playState: player.playState,
    title: player.title,
    thumbnailUrl: player.thumbnailUrl,
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
  thumbnailUrl,
  navigation,
  previousId,
  nextId,
  id,
}) => {
  const [isBarrage, setIsBarrage] = useState(false);
  const [barrageData, setBarrageData] = useState<Message[]>([]);
  const timer = useRef<any>(null);

  const anim = useRef(new Animated.Value(0)).current;

  const addBarrage = useCallback(() => {
    timer.current = setInterval(() => {
      if (isBarrage) {
        const id = Date.now();
        const titleB = getText();
        setBarrageData([
          {
            id,
            title: titleB,
          },
        ]);
      }
    }, 5000);
  }, [isBarrage]);

  useEffect(() => {
    if (route.params && route.params.id !== id) {
      dispatch({
        type: 'player/fetchShow',
        payload: {
          id: route.params.id,
        },
      });
    } else {
      dispatch({
        type: 'player/play',
      });
    }
  }, [dispatch, id, route.params]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: title,
    });
  }, [navigation, title]);

  useEffect(() => {
    addBarrage();
    return () => {
      clearInterval(timer.current);
    };
  }, [addBarrage]);

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
  }, [isBarrage]);

  useEffect(() => {
    Animated.timing(anim, {
      toValue: isBarrage ? SCALE : 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, [anim, isBarrage]);

  return (
    <View style={styles.container}>
      <View style={styles.imageView}>
        <Animated.Image
          source={{uri: thumbnailUrl}}
          style={[
            styles.image,
            // eslint-disable-next-line react-native/no-inline-styles
            {
              borderRadius: isBarrage ? 0 : 8,
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
        <>
          <LinearGradient
            colors={['rgba(128,104,102,0.5)', '#807c66']}
            style={styles.linear}
          />
          <Barrage data={barrageData} maxTrack={5} style={{top: PADDING_TOP}} />
        </>
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
