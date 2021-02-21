import React from 'react';
import {Model, Effect} from 'dva-core-ts';
import {Reducer} from 'redux';
import axios from 'axios';
import {RootState} from './index';
import VideoPlayer from 'react-native-video-player';

const FOUND_URL = '/mock/11/bear/found/list';

// export interface IFound {
//   id: string;
//   thumbnailUrl: string;
//   videoUrl: string;
//   forward: string;
//   comment: number;
//   like: number;
//   backgroundColor: string;
//   user: {
//     id: string;
//     name: string;
//     avatar: string;
//   };
//   playerRef: React.RefObject<VideoPlayer>;
// }

// export interface FoundState {
//   list: IFound[];
//   refreshing: boolean;
//   paused: boolean;
// }

/**
 * 发现模块的model
 */
interface FoundModel extends Model {
  namespace: 'found';
  //   state: FoundState;
  //   reducers: {
  //     setState: Reducer<FoundState>;
  //   };
  effects: {
    fetchList: Effect;
    // startPlay: Effect;
  };
}

// const initialState: FoundState = {
//   list: [],
//   refreshing: false,
//   paused: true,
// };

const foundModel: FoundModel = {
  namespace: 'found',
  //   state: initialState,
  state: {},
  //   reducers: {
  //     setState(state, {payload}) {
  //       return {
  //         ...state,
  //         ...payload,
  //       };
  //     },
  //   },
  effects: {
    *fetchList({callback}, {call, put, select}) {
      //   const {refreshing} = payload;
      //   yield put({
      //     type: 'setState',
      //     payload: {
      //       refreshing,
      //     },
      //   });
      let {data} = yield call(axios.get, FOUND_URL);
      if (typeof callback === 'function') {
        callback(data);
      }
    },
    // *startPlay({payload}, {put, select}) {
    //   const list: IFound[] = yield select(({found}: RootState) => found.list);
    //   list.forEach(item => {
    //     if (item.id !== payload.currentItem.id && item.playerRef.current) {
    //       item.playerRef.current.pause();
    //     }
    //   });
    //   yield put({
    //     type: 'player/pause',
    //   });
    // },
  },
};

export default foundModel;
