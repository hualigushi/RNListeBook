import React from 'react';

import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import Home from '@/pages/Home';
import TopBarBarWrapper from '@/pages/views/TopBarBarWrapper';
import {StyleSheet} from 'react-native';

const Tab = createMaterialTopTabNavigator();

const HomeTabs: React.FC = () => {
  const tabBar = (props: MaterialTopTabBarProps) => {
    return <TopBarBarWrapper {...props} />;
  };
  return (
    <Tab.Navigator
      lazy
      tabBar={tabBar} // 自定义顶部标签栏
      sceneContainerStyle={styles.sceneContainer}
      tabBarOptions={{
        scrollEnabled: true,
        tabStyle: {
          width: 80,
        },
        indicatorStyle: {
          height: 4,
          width: 20,
          marginLeft: 30,
          borderRadius: 2,
          backgroundColor: '#f86442',
        },
        activeTintColor: '#f86442',
        inactiveTintColor: '#333',
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: '推荐',
        }}
      />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  sceneContainer: {
    backgroundColor: 'transparent', // 背景色透明，渐变色才生效
  },
});
export default HomeTabs;
