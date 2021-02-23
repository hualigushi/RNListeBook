import React, {useCallback} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {Formik} from 'formik';
import Touchable from '@/components/Touchable';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '../models';

const mapStateToProps = ({loading}: RootState) => {
  return {
    loading: loading.effects['user/login'],
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {}

interface Values {
  account: string;
  password: string;
}

const initialValues: Values = {
  account: '',
  password: '',
};

const Login: React.FC<IProps> = ({dispatch}) => {
  const onSubmit = useCallback(
    (values: Values) => {
      dispatch({
        type: 'user/login',
        payload: values,
      });
    },
    [dispatch],
  );

  return (
    // 键盘一直保持唤醒状态
    <ScrollView keyboardShouldPersistTaps="handled">
      <Text style={styles.logo}>听书</Text>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({values, handleChange, handleBlur, handleSubmit}) => {
          return (
            <View>
              <TextInput
                onChange={handleChange('account')}
                onBlur={handleBlur('account')}
                value={values.account}
              />
              <TextInput
                onChange={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry
              />
              <Touchable onPress={handleSubmit}>
                <Text>登录</Text>
              </Touchable>
            </View>
          );
        }}
      </Formik>
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
export default connector(Login);
