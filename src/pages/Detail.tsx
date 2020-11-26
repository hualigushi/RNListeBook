import {RouteProp} from '@react-navigation/native';
import React from 'react';
import {Text, View} from 'react-native';
import {RootStackParamList} from '../navigator';

interface IProps {
  route: RouteProp<RootStackParamList, 'Detail'>;
}
const Detail: React.FC<IProps> = ({route}) => {
  return (
    <View>
      <Text>Detail</Text>
      <Text>{route.params.id}</Text>
    </View>
  );
};

export default Detail;
