import {IFound} from '@/models/found';
import React from 'react';
import {Text} from 'react-native';
import {StyleSheet, View} from 'react-native';
import VideoControls from 'react-native-video-custom-controls';

interface Iprops {
  data: IFound;
}
const Item: React.FC<Iprops> = ({data}) => {
  return (
    <View>
      <Text>{data.title}</Text>
      <VideoControls
        paused
        source={{uri: data.videoUrl}}
        style={styles.video}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  video: {
    height: 220,
  },
});
export default Item;
