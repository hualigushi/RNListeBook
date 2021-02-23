import {IFound} from '@/models/found';
import React, {useEffect, useState} from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import Item from './Item';

const connector = connect();

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {}

const Found: React.FC<IProps> = ({dispatch}) => {
  const [list, setList] = useState<IFound[]>([]);
  useEffect(() => {
    dispatch({
      type: 'found/fetchList',
      callback: (data: IFound[]) => {
        setList(data);
      },
    });
  }, [dispatch]);

  const renderItem = ({item}: ListRenderItemInfo<IFound>) => {
    return <Item data={item} />;
  };

  return <FlatList data={list} renderItem={renderItem} />;
};

export default connector(Found);
