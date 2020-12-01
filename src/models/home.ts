import {Effect, Model} from 'dva-core-ts';
import {Reducer} from 'redux';
import axios from 'axios';

//轮播图
const CAROUSEL_URL = '/mock/9203/carousel';

//猜你喜欢
const GUESS_URL = '/mock/9203/guess';

//首页列表
const CHANNEL_URL = '/mock/9203/channel';
export interface ICarousel {
  id: string;
  image: string;
  colors: [string, string];
}
export interface IGUESS {
  id: string;
  title: string;
  image: string;
}
export interface HomeState {
  carousels: ICarousel[];
  guess: IGUESS[];
}
interface HomeModel extends Model {
  namespace: 'home';
  state: HomeState;
  reducers: {
    setState: Reducer<HomeState>;
  };
  effects: {
    fetchCarousels: Effect;
    fetchGuess: Effect;
  };
}

const initialState = {
  carousels: [],
  guess: [],
};
const homeModel: HomeModel = {
  namespace: 'home',
  state: initialState,
  reducers: {
    setState(state = initialState, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    *fetchCarousels(_, {call, put}) {
      const {data} = yield call(axios.get, CAROUSEL_URL);
      console.log(data);
      yield put({
        type: 'setState',
        payload: {
          carousels: data,
        },
      });
    },
    *fetchGuess(_, {call, put}) {
      const {data} = yield call(axios.get, GUESS_URL);
      yield put({
        type: 'setState',
        payload: {
          guess: data,
        },
      });
    },
  },
};
export default homeModel;
