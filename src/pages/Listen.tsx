import realm, {IProgram} from '@/config/realm';
import React from 'react';
import {
  FlatList,
  Image,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {formatTime} from '../utils';
import Icon from '@/assets/iconfont';

const Listen: React.FC = () => {
  const programs = realm.objects<IProgram>('Program');
  const renderItem = ({item}: ListRenderItemInfo<IProgram>) => {
    return (
      <View style={styles.item}>
        <Image source={{uri: item.thumbnailUrl}} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.bottom}>
            <Icon name="icon-time" color="#999" size={14} />
            <Text style={styles.text}>{formatTime(item.duration)}</Text>
            <Text style={styles.rate}>已播：{item.rate}%</Text>
          </View>
        </View>
      </View>
    );
  };
  return <FlatList data={programs} renderItem={renderItem} />;
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    marginHorizontal: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  image: {
    width: 65,
    height: 65,
    borderRadius: 3,
    margin: 5,
  },
  title: {
    color: '#999',
  },
  content: {
    justifyContent: 'space-around',
    flex: 1,
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: '#999',
    marginLeft: 5,
  },
  rate: {
    marginLeft: 20,
    color: '#f6a624',
  },
});
export default Listen;
