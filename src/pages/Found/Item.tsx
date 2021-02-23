import {IFound} from '@/models/found';
import React, {useCallback} from 'react';
import {Text} from 'react-native';
import {StyleSheet, View} from 'react-native';
import VideoControls from 'react-native-video-custom-controls';

interface Iprops {
  data: IFound;
  setCurrentId: (id: string) => void;
  paused: boolean;
}
const Item: React.FC<Iprops> = ({data, setCurrentId, paused}) => {
  const onPlay = useCallback(() => {
    setCurrentId(data.id);
  }, [data.id, setCurrentId]);

  const onPause = useCallback(() => {
    setCurrentId('');
  }, [setCurrentId]);

  return (
    <View>
      <Text>{data.title}</Text>
      <VideoControls
        paused={paused}
        source={{uri: data.videoUrl}}
        style={styles.video}
        onPlay={onPlay}
        onPause={onPause}
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
