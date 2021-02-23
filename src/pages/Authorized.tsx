import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Touchable from '@/components/Touchable';
import defaultAvatar from '@/assets/default_avatar.png';
import {navigate} from '../utils';

interface IProps {
  authority?: boolean;
  noMatch?: () => JSX.Element;
}

const Authorized: React.FC<IProps> = ({noMatch, authority, children}) => {
  if (authority) {
    return <>{children}</>;
  }
  const onPress = () => {
    navigate('Login');
  };

  const renderNoMatch = () => {
    if (noMatch) {
      return <View>{noMatch}</View>;
    }
    return (
      <View style={styles.loginView}>
        <Image source={defaultAvatar} style={styles.avatar} />
        <View style={styles.right}>
          <Touchable style={styles.loginBtn} onPress={onPress}>
            <Text style={styles.loginText}>立即登录</Text>
          </Touchable>
          <Text style={styles.tip}>登陆后自动同步记录哦~</Text>
        </View>
      </View>
    );
  };

  return <View>{renderNoMatch()}</View>;
};
const styles = StyleSheet.create({
  loginView: {
    flexDirection: 'row',
    margin: 15,
  },
  avatar: {
    width: 70,
    height: 7,
    borderRadius: 35,
  },
  right: {
    flex: 1,
    marginLeft: 15,
  },
  loginBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 26,
    width: 76,
    borderRadius: 13,
    borderColor: '#f86442',
    borderWidth: 1,
    marginBottom: 12,
  },
  loginText: {
    color: '#f86442',
    fontWeight: '900',
  },
  tip: {
    color: '#999',
  },
});

export default Authorized;
