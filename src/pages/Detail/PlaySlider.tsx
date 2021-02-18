import {RootState} from '@/models/index';
import {formatTime} from '@/utils/index';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Slider from 'react-native-slider-x';
import {connect, ConnectedProps} from 'react-redux';

const mapStateToProps = ({player}: RootState) => {
  return {
    currentTime: player.currentTime,
    duration: player.duration,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {}

const PlaySlider: React.FC<IProps> = ({currentTime, duration}) => {
  // 自定义滑块
  const renderThumb = () => {
    return (
      <View>
        <Text style={styles.text}>
          {formatTime(currentTime)}/{formatTime(duration)}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Slider
        value={currentTime}
        maximumValue={duration}
        maximumTrackTintColor="rgba(255,255,255,0.3)"
        minimumTrackTintColor="white"
        renderThumb={renderThumb}
        thumbStyle={styles.thumb}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  thumb: {
    backgroundColor: '#fff',
    width: 76,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 10,
  },
});
export default connector(PlaySlider);
