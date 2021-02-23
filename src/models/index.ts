import {DvaLoadingState} from 'dva-loading-ts';
import album from './album';
import category from './category';
import found from './found';
import home from './home';
import player from './player';
import user from './user';

const models = [home, category, album, player, found, user];
export type RootState = {
  home: typeof home.state;
  category: typeof category.state;
  album: typeof album.state;
  player: typeof player.state;
  user: typeof user.state;
  loading: DvaLoadingState;
} & {
  [key: string]: typeof home.state;
};
export default models;
