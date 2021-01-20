import {NavigationState} from '@react-navigation/native';
import {Dimensions} from 'react-native';

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window'); // 返回当前屏幕的宽高
// 根据百分比获取宽度
function wp(percentage: number) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}
// 根据百分比获取宽度
function hp(percentage: number) {
  const value = (percentage * viewportHeight) / 100;
  return Math.round(value);
}

// 根据当前状态查找当前处于焦点的页面名字
function getActiveRouteName(state: NavigationState) {
  let route;
  route = state.routes[state.index];
  while (route.state && route.state.index) {
    route = route.state.routes[route.state.index];
  }
  return route.name;
}
export {viewportWidth, viewportHeight, wp, hp, getActiveRouteName};
