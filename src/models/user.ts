import axios from 'axios';
import {Model, Effect, SubscriptionsMapObject} from 'dva-core-ts';
import {Reducer} from 'redux';
import storage, {storageLoad} from '@/config/storage';
import {goBack} from '../utils';

const USER_URL = '/mock/11/bear/login';

export interface IUser {
  name: string;
  avatar: string;
}

export interface UserModelState {
  // loging: boolean;
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
  // loging: false,
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
        const user = yield call(storageLoad, {key: 'user'});
        yield put({
          type: 'setState',
          payload: {
            // loging: true,
            user: user,
          },
        });
      } catch (e) {
        console.log('*loadStorage ~ e', e);
      }
    },
    *login({payload}, {call, put}) {
      const {data, status} = yield call(axios.post, USER_URL, payload);
      if (status === 100) {
        yield put({
          type: 'setState',
          payload: {
            // loging: true,
            user: data,
          },
        });
        storage.save({
          key: 'user', // 注意:请不要在key中使用_下划线符号!
          data: data,
        });
        goBack(); // 登录成功后返回
      }
    },
    *logout(_, {put}) {
      yield put({
        type: 'setState',
        payload: {
          // loging: false,
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
