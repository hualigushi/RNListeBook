import {Effect, Model} from 'dva-core-ts';
import {Reducer} from 'redux';
interface HomeState {
  num: number;
}
interface HomeModel extends Model {
  namespace: 'home';
  state: HomeState;
}
const homeModel: HomeModel = {
  namespace: 'home',
  state: {
    num: 0,
  },
};
export default homeModel;
