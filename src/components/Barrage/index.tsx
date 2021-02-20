import React, {useCallback, useEffect, useRef} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import Item from './Item';

export interface Message {
  id: number;
  title: string;
}

export interface IBarrage extends Message {
  trackIndex: number;
  isFree?: boolean;
}

interface IProps {
  data: Message[];
  maxTrack: number;
  style?: StyleProp<ViewStyle>;
}

function addBarrage(data: Message[], maxTrack: number, prevlist: IBarrage[][]) {
  const list = prevlist.slice();

  for (let i = 0; i < data.length; i++) {
    const trackIndex = getTrackIndex(list, maxTrack);
    if (trackIndex < 0) {
      continue;
    }

    if (!list[trackIndex]) {
      list[trackIndex] = [];
    }

    const barrage = {
      ...data[i],
      trackIndex,
    };

    list[trackIndex].push(barrage);
  }
  return list;
}

// 获取新弹幕的轨道值 如果为-1 说明当前没有空闲轨道，丢弃当前弹幕
function getTrackIndex(list: IBarrage[][], maxTrack: number) {
  for (let i = 0; i < maxTrack; i++) {
    const barrageOfTrack = list[i];
    if (!barrageOfTrack || barrageOfTrack.length === 0) {
      return i;
    }

    const lastBarrageOfTrack = barrageOfTrack[barrageOfTrack.length - 1];
    if (lastBarrageOfTrack.isFree) {
      return i;
    }
  }
  return -1;
}

const Barrage: React.FC<IProps> = ({data, maxTrack, style}) => {
  const list = useRef<IBarrage[][]>([]);

  // TODO: 显示效果有问题
  useEffect(() => {
    list.current = addBarrage(data, maxTrack, list.current);
  }, [data, maxTrack]);

  const outside = useCallback(
    (data: IBarrage) => {
      const newList = list.current.slice();
      if (newList.length > 0) {
        const {trackIndex} = data;
        newList[trackIndex] = newList[trackIndex].filter(
          (item) => item.id !== data.id,
        );
        list.current = newList;
      }
    },
    [list],
  );

  const renderItem = (item: IBarrage[]) => {
    return item.map((barrage) => {
      return <Item data={barrage} key={barrage.id} outside={outside} />;
    });
  };

  return (
    <View style={[styles.container, style]}>
      {list.current.map(renderItem)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
});
export default Barrage;
