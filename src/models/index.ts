import {DvaLoadingState} from 'dva-loading-ts';
import album from './album';
import category from './category';
import found from './found';
import home from './home';
import player from './player';
const models = [home, category, album, player, found];
export type RootState = {
  home: typeof home.state;
  category: typeof category.state;
  album: typeof album.state;
  player: typeof player.state;
  loading: DvaLoadingState;
} & {
  [key: string]: typeof home.state;
};
export default models;
