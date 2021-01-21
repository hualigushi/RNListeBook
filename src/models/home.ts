import {Effect, Model} from 'dva-core-ts';
import {Reducer} from 'redux';
import axios from 'axios';
import {RootState} from './index';

//轮播图
const CAROUSEL_URL = '/mock/11/bear/carousel';
//首页列表
const CHANNEL_URL = '/mock/11/bear/channel';
//猜你喜欢
const GUESS_URL = '/mock/11/bear/guess';
export interface ICarousel {
  id: string;
  image: string;
  colors: [string, string];
}
export interface IGuess {
  id: string;
  title: string;
  image: string;
}
export interface IChannel {
  id: string;
  title: string;
  image: string;
  remark: string;
  played: number;
  playing: number;
}
export interface HomeState {
  carousels: ICarousel[];
  gradientVisible: boolean; // 渐变色组件是否显示
  activeCarouselIndex: number; // 当前轮播图的下表
  guess: IGUESS[];
  channels: IChannel[];
  pagination: IPagination;
}
export interface IPagination {
  current: number;
  total: number;
  hasMore: boolean;
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
    fetchChannels: Effect;
  };
}

const initialState = {
  carousels: [],
  gradientVisible: true,
  activeCarouselIndex: 0,
  guess: [],
  channels: [],
  pagination: {
    current: 1,
    total: 0,
    hasMore: true,
  },
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
      yield put({
        type: 'setState',
        payload: {
          carousels: data || [],
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
    *fetchChannels({callback, payload}, {call, put, select}) {
      const {channels, pagination} = yield select(
        (state: RootState) => state.home,
      );
      let page = 1;
      if (payload && payload.loadMore) {
        page = pagination.current + 1;
      }
      const {data} = yield call(axios.get, CHANNEL_URL, {
        params: {
          page,
        },
      });
      let newChannels = data.results;
      if (payload && payload.loadMore) {
        newChannels = channels.concat(newChannels);
      }
      yield put({
        type: 'setState',
        payload: {
          channels: newChannels,
          pagination: {
            current: data.pagination.current,
            total: data.pagination.total,
            hasMore: newChannels.length < data.pagination.total,
          },
        },
      });
      if (typeof callback === 'function') {
        callback();
      }
    },
  },
};
export default homeModel;
