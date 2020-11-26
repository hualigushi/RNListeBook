import React from 'react';
import {Button, Text, View} from 'react-native';
import {RootStackNavigation} from '../navigator';

interface Iprops {
  navigation: RootStackNavigation;
}
const Home: React.FC<Iprops> = ({navigation}) => {
  const onPress = () => {
    navigation.navigate('Detail', {
      id: 100
    });
  };
  return (
    <View>
      <Text>Home</Text>
      <Button title="跳转" onPress={onPress} />
    </View>
  );
};

export default Home;
