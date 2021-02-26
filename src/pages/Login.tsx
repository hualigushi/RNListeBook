import React, {useCallback} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Field, Formik} from 'formik';
import Touchable from '@/components/Touchable';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '../models';
import * as Yup from 'yup';
import Input from '@/components/Input';

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

const Login: React.FC<IProps> = ({dispatch, loading}) => {
  const onSubmit = useCallback(
    (values: Values) => {
      console.log('values', values);
      dispatch({
        type: 'user/login',
        payload: values,
      });
    },
    [dispatch],
  );

  const validationSchema = Yup.object().shape({
    account: Yup.string().trim().required('请输入您的账号'),
    password: Yup.string().trim().required('请输入密码'),
  });

  return (
    // 键盘一直保持唤醒状态
    <ScrollView keyboardShouldPersistTaps="handled">
      <Text style={styles.logo}>听书</Text>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}>
        {({handleSubmit}) => (
          <View>
            <Field component={Input} placeholder="请输入账号" name="account" />
            <Field
              component={Input}
              placeholder="请输入密码"
              name="password"
              secureTextEntry
            />
            <Touchable
              disabled={loading}
              onPress={handleSubmit}
              style={styles.loginBtn}>
              <Text style={styles.loginBtnText}>登录</Text>
            </Touchable>
          </View>
        )}
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
  loginBtn: {
    marginTop: 40,
    margin: 10,
    height: 40,
    borderRadius: 20,
    borderColor: '#ff4000',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBtnText: {
    color: '#ff4000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
export default connector(Login);
