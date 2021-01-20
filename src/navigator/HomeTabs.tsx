import React from 'react';

import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import Home from '@/pages/Home';
import TopBarBarWrapper from '@/pages/views/TopBarBarWrapper';
import {StyleSheet} from 'react-native';
import {RootState} from '../models';
import {connect, ConnectedProps} from 'react-redux';
import {ICategory} from '@/models/category';
import {createHomeModel} from '@/config/dva';

export type HomeParamsList = {
  [key: string]: {
    namespace: string;
  };
};

const Tab = createMaterialTopTabNavigator<HomeParamsList>();

const mapStateToProps = ({category}: RootState) => {
  return {
    myCategorys: category.myCategorys,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {}

const HomeTabs: React.FC<IProps> = ({myCategorys}) => {
  const tabBar = (props: MaterialTopTabBarProps) => {
    return <TopBarBarWrapper {...props} />;
  };

  const renderScreen = (item: ICategory) => {
    createHomeModel(item.id);
    return (
      <Tab.Screen
        key={item.id}
        name={item.id}
        component={Home}
        options={{
          tabBarLabel: item.name,
        }}
        initialParams={{
          namespace: item.id,
        }}
      />
    );
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
      {myCategorys.map(renderScreen)}
      {/* <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: '推荐',
        }}
      /> */}
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  sceneContainer: {
    backgroundColor: 'transparent', // 背景色透明，渐变色才生效
  },
});
export default connector(HomeTabs);
