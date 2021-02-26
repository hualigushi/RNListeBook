import axios from 'axios';
import {Model, Effect, SubscriptionsMapObject} from 'dva-core-ts';
import {Reducer} from 'redux';
import storage, {load} from '@/config/storage';
import {goBack} from '../utils';
import Toast from 'react-native-root-toast';

const USER_URL = '/mock/11/bear/login';

export interface IUser {
  name: string;
  avatar: string;
}

export interface UserModelState {
  user?: IUser;
}

export interface UserModel extends Model {
  namespace: 'user';
  state: UserModelState;
  effects: {
    login: Effect;
    logout: Effect;
    loadStorage: Effect;
  };
  reducers: {
    setState: Reducer<UserModelState>;
  };
  subscriptions: SubscriptionsMapObject;
}

const initialState = {
  user: undefined,
};

/**
 * 登录模块的model
 */
const userModel: UserModel = {
  namespace: 'user',
  state: initialState,
  reducers: {
    setState(state, {payload}) {
      const newState = {
        ...state,
        ...payload,
      };

      return newState;
    },
  },
  effects: {
    *loadStorage(_, {call, put}) {
      try {
        const user = yield call(load, {key: 'user'});
        yield put({
          type: 'setState',
          payload: {
            user: user,
          },
        });
      } catch (e) {
        console.log('*loadStorage ~ e', e);
      }
    },
    *login({payload}, {call, put}) {
      const {data, status, msg} = yield call(axios.post, USER_URL, payload);
      console.log('*login ~ data, status, msg', data, status, msg);
      if (status === 300) {
        yield put({
          type: 'setState',
          payload: {
            user: data,
          },
        });
        storage.save({
          key: 'user', // 注意:请不要在key中使用_下划线符号!
          data: data,
        });
        goBack(); // 登录成功后返回
      } else {
        Toast.show(msg, {
          duration: Toast.durations.LONG,
          position: Toast.positions.CENTER,
          shadow: true,
          animation: true,
        });
      }
    },
    *logout(_, {put}) {
      yield put({
        type: 'setState',
        payload: {
          user: undefined,
        },
      });
      storage.save({
        key: 'user', // 注意:请不要在key中使用_下划线符号!
        data: null,
      });
    },
  },
  subscriptions: {
    setup({dispatch}) {
      dispatch({type: 'loadStorage'});
    },
  },
};

export default userModel;
