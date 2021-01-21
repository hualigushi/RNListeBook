import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {useHeaderHeight} from '@react-navigation/stack';
import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';
import {RootStackParamList} from '@/navigator/index';
import {RouteProp} from '@react-navigation/native';
import CorverRight from '@/assets/cover-right.png';
import {BlurView} from '@react-native-community/blur';

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

const Album: React.FC<IProps> = ({dispatch, route, summary, author}) => {
  const headerHeight = useHeaderHeight();

  useEffect(() => {
    const {id} = route.params.item;
    console.log('useEffect ~ id', id);
    dispatch({
      type: 'album/fetchAlbum',
      payload: {
        id,
      },
    });
  }, [dispatch, route.params.item]);

  const renderHeader = () => {
    const {title, image} = route.params.item;
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
  };

  return <View>{renderHeader()}</View>;
};
const styles = StyleSheet.create({
  header: {
    height: 260,
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
