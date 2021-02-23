/* eslint-disable react-native/no-inline-styles */
import React, {useCallback} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Touchable from '@/components/Touchable';
import {RootState} from '../models';
import {connect, ConnectedProps} from 'react-redux';
import Authorized from './Authorized';

const mapStateToProps = ({user}: RootState) => {
  return {
    user: user.user,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {}

const Account: React.FC<IProps> = ({user, dispatch}) => {
  const logout = useCallback(() => {
    dispatch({
      type: 'user/logout',
    });
  }, [dispatch]);

  return (
    <Authorized authority={!!user}>
      <View style={styles.loginView}>
        <Image source={{uri: user?.avatar}} style={styles.avatar} />
        <View style={styles.right}>
          <Text>{user?.name}</Text>
        </View>
        <Touchable style={[styles.loginBtn, {marginLeft: 15}]} onPress={logout}>
          <Text style={styles.loginText}>退出登录</Text>
        </Touchable>
      </View>
    </Authorized>
  );
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
export default connector(Account);
