import {DvaLoadingState} from 'dva-loading-ts';
import album from './album';
import category from './category';
import home from './home';
const models = [home, category, album];
export type RootState = {
  home: typeof home.state;
  category: typeof category.state;
  album: typeof album.state;
  loading: DvaLoadingState;
} & {
  [key: string]: typeof home.state;
};
export default models;
