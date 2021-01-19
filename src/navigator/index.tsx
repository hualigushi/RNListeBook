import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
  HeaderStyleInterpolators,
  StackNavigationProp,
} from '@react-navigation/stack';
import BottomTabs from './BottomTabs';
import Detail from '@/pages/Detail';
import { Platform, StatusBar, StyleSheet } from 'react-native';
import Category from '@/pages/category';

export type RootStackParamList = {
  BottomTabs: {
    screen: string;
  };
  Category: undefined;
  Detail: {
    // 导航传参
    id: number;
  };
};

export type RootStackNavigation = StackNavigationProp<RootStackParamList>;

const Stack = createStackNavigator<RootStackParamList>();
const Navigator: React.FC = () => {
  return (
    // 堆栈导航器嵌套标签导航器
    <NavigationContainer>
      <Stack.Navigator
        headerMode="float" // 所有页面共用一个标题栏
        screenOptions={{
          headerTitleAlign: 'center',
          headerStyleInterpolator: HeaderStyleInterpolators.forUIKit, // 跳转页面标题栏加载方向为从右向左
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // 跳转页面卡片加载方向为从右向左
          gestureEnabled: true, // 手势
          gestureDirection: 'horizontal', // 手势为水平方向
          ...Platform.select({
            android: {
              headerStatusBarHeight: StatusBar.currentHeight, // 状态栏高度
            },
          }),
          headerBackTitleVisible: false, // 不显示返回标题
          headerTintColor: '#333',
          // 安卓上没有阴影，只有投影，即不能改变光源
          headerStyle: {
            ...Platform.select({
              // 针对平台的单独设置
              android: {
                elevation: 0,
                borderBottomWidth: StyleSheet.hairlineWidth,
              },
            }),
          },
        }}>
        <Stack.Screen
          name="BottomTabs"
          component={BottomTabs}
          options={{
            headerTitle: '首页',
          }}
        />
        <Stack.Screen
          name="Category"
          component={Category}
          options={{
            headerTitle: '分类',
          }}
        />
        <Stack.Screen
          options={{ headerTitle: '详情页' }}
          name="Detail"
          component={Detail}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
