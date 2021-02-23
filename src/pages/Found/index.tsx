import {IFound} from '@/models/found';
import React, {useEffect, useState, useCallback} from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import Item from './Item';

const connector = connect();

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {}

const Found: React.FC<IProps> = ({dispatch}) => {
  const [list, setList] = useState<IFound[]>([]);
  const [currentId, setCurrentId] = useState('');

  useEffect(() => {
    dispatch({
      type: 'found/fetchList',
      callback: (data: IFound[]) => {
        setList(data);
      },
    });
  }, [dispatch]);

  // 保存当前播放的视频id
  const onSetCurrentId = useCallback(
    (id: string) => {
      setCurrentId(id);
      if (id) {
        // 播放视频时暂停音频
        dispatch({
          type: 'player/pause',
        });
      }
    },
    [dispatch],
  );

  const renderItem = ({item}: ListRenderItemInfo<IFound>) => {
    const paused = item.id !== currentId;
    return <Item data={item} paused={paused} setCurrentId={onSetCurrentId} />;
  };

  return <FlatList data={list} renderItem={renderItem} extraData={currentId} />;
};

export default connector(Found);
