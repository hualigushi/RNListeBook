import React from 'react';
import {Button, Text, View} from 'react-native';
import {RootStackNavigation} from '../navigator';

interface Iprops {
  navigation: RootStackNavigation;
}
const Found: React.FC<Iprops> = ({navigation}) => {
  const onPress = () => {
    navigation.navigate('Detail', {
      id: 100
    });
  };
  return (
    <View>
      <Text>Found</Text>
      <Button title="跳转" onPress={onPress} />
    </View>
  );
};

export default Found;
