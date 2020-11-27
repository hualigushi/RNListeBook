import React from 'react';
import { Button, Text, View } from 'react-native';
import { ConnectedProps } from 'react-redux';
import { RootState } from '../models';
import { RootStackNavigation } from '../navigator';

const mapStateToProps = ({ home, loading }: RootState) => (
  {
    num: home.num,
    loading: loading.effects['']
  }
)
const connector = connect(mapStateToProps)
type ModelState = ConnectedProps<typeof connector>
interface Iprops extends ModelState {
  navigation: RootStackNavigation;
}
const Home: React.FC<Iprops> = ({ navigation }) => {
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

export default connector(Home);
