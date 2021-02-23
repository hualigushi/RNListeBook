import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {RootStackNavigation} from '../navigator';

interface Iprops {}
const Login: React.FC<Iprops> = ({}) => {
  return (
    // 键盘一直保持唤醒状态
    <ScrollView keyboardShouldPersistTaps="handled">
      <Text style={styles.logo}>听书</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  logo: {
    color: '#ff4000',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 50,
    marginTop: 40,
  },
});
export default Login;
