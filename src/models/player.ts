import {getCurrentTime, getDuration, init, pause, play} from '@/config/sound';
import axios from 'axios';
import {Effect, EffectsCommandMap, EffectWithType, Model} from 'dva-core-ts';
import {Reducer} from 'redux';

const SHOW_URL = '/mock/11/bear/show';

export interface PlayerModelState {
  id: string;
  soundUrl: string;
  playState: string;
  currentTime: number;
  duration: number;
}

export interface PlayerModel extends Model {
  namespace: 'player';
  state: PlayerModelState;
  reducers: {
    setState: Reducer<PlayerModelState>;
  };
  effects: {
    fetchShow: Effect;
    play: Effect;
    pause: Effect;
    watcherCurrentTime: EffectWithType; // 该类型是一个数组类型，第一个参数是生成器函数，第二个参数是一个对象
  };
}

const initialState: PlayerModelState = {
  id: '',
  soundUrl: '',
  playState: '',
  currentTime: 0,
  duration: 0,
};

const delay = (timeout: number) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

// 每隔一秒获取当前的音频时间
function* currentTime({call, put}: EffectsCommandMap) {
  while (true) {
    yield call(delay, 1000);
    const currentTime = yield call(getCurrentTime);
    yield put({
      type: 'setState',
      payload: {
        currentTime,
      },
    });
  }
}

const playerModel: PlayerModel = {
  namespace: 'player',
  state: initialState,
  reducers: {
    setState(state, {payload}) {
      const newState = {
        ...state,
        ...payload,
      };
      const percent = (newState.playSeconds / newState.duration) * 100;
      newState.percent = percent;
      return newState;
    },
  },
  effects: {
    *fetchShow(payload, {call, put}) {
      const {data} = yield call(axios.get, SHOW_URL, {
        params: {
          id: payload.id,
        },
      });
      yield call(init, data.soundUrl);
      yield put({
        type: 'setState',
        payload: {
          id: data.id,
          soundUrl: data.soundUrl,
          duration: getDuration(),
        },
      });
      yield put({
        type: 'play',
      });
    },
    *play({payload}, {call, put}) {
      yield put({
        type: 'setState',
        payload: {
          playState: 'playing',
        },
      });
      yield call(play);
      yield put({
        type: 'setState',
        payload: {
          playState: 'paused',
        },
      });
    },
    *pause({payload}, {call, put}) {
      yield call(pause);
      yield put({
        type: 'setState',
        payload: {
          playState: 'paused',
        },
      });
    },
    watcherCurrentTime: [
      function* (sagaEffects) {
        // 开始播放后，启动轮询
        const {call, take, race} = sagaEffects;
        while (true) {
          yield take('play');
          yield race([call(currentTime, sagaEffects), take('pause')]);
        }
      },
      {
        type: 'watcher', // dva加载后执行函数
      },
    ],
  },
};

export default playerModel;
