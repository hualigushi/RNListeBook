import {init, play} from '@/config/sound';
import axios from 'axios';
import {Effect, Model} from 'dva-core-ts';
import {Reducer} from 'redux';

const SHOW_URL = '/mock/11/bear/show';

export interface PlayerModelState {
  id: string;
  soundUrl: string;
  playState: string;
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
  };
}

const initialState: PlayerModelState = {
  id: '',
  soundUrl: '',
  playState: '',
};

const PlayerModel: PlayerModel = {
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
      console.log('*fetchShow ~ data', data);
      yield put({
        type: 'setState',
        payload: {
          id: data.id,
          soundUrl: data.soundUrl,
        },
      });
      yield call(init, data.soundUrl);
      yield put({
        type: 'play',
      });
    },
    *play(payload, {call, put}) {
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
          playState: 'pause',
        },
      });
    },
  },
};

export default PlayerModel;
