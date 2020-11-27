import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '@/pages/Home';
import Listen from '@/pages/Listen';
import Found from '@/pages/Found';
import Account from '@/pages/Account';
import Icon from '@/assets/iconfont';
import {RootStackNavigation, RootStackParamList} from '.';
import {
  getFocusedRouteNameFromRoute,
  RouteProp,
  TabNavigationState,
} from '@react-navigation/native';
import HomeTabs from './HomeTabs';
export type BottomTabParamList = {
  HomeTabs: undefined;
  Listen: undefined;
  Found: undefined;
  Account: undefined;
};
const Tab = createBottomTabNavigator<BottomTabParamList>();

type Route = RouteProp<RootStackParamList, 'BottomTabs'> & {
  state?: TabNavigationState;
};
interface IProps {
  navigation: RootStackNavigation;
  route: Route;
}

const getHeaderTitle = (route: Route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'HomeTabs';

  switch (routeName) {
    case 'Home':
      return '首页';
    case 'Listen':
      return '我听';
    case 'Found':
      return '发现';
    case 'Account':
      return '账户';
    default:
      return '首页';
  }
};
const BottomTabs: React.FC<IProps> = ({navigation, route}) => {
  useEffect(() => {
    navigation.setOptions({
      headerTitle: getHeaderTitle(route),
    });
  }, [navigation, route]);
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#f86442',
      }}>
      <Tab.Screen
        name="HomeTabs"
        component={HomeTabs}
        options={{
          tabBarLabel: '首页',
          tabBarIcon: ({color, size}) => (
            <Icon name="icon-shouye" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Listen"
        component={Listen}
        options={{
          tabBarLabel: '我听',
          tabBarIcon: ({color, size}) => (
            <Icon name="icon-shoucang" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Found"
        component={Found}
        options={{
          tabBarLabel: '发现',
          tabBarIcon: ({color, size}) => (
            <Icon name="icon-faxian" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarLabel: '我的',
          tabBarIcon: ({color, size}) => (
            <Icon name="icon-user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default BottomTabs;
