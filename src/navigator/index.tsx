import React from 'react';
import {NavigationContainer, RouteProp} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
  HeaderStyleInterpolators,
  StackNavigationProp,
} from '@react-navigation/stack';
import BottomTabs from './BottomTabs';
import {Animated, Platform, StatusBar, StyleSheet} from 'react-native';
import Category from '@/pages/Category';
import Album from '@/pages/Album';
import Detail from '@/pages/Detail';

export type RootStackParamList = {
  BottomTabs: {
    screen: string;
  };
  Category: undefined;
  Album: {
    item: {
      id: string;
      title: string;
      image: string;
    };
    opacity: Animated.AnimatedInterpolation;
  };
};

export type RootStackNavigation = StackNavigationProp<RootStackParamList>;

const Stack = createStackNavigator<RootStackParamList>();

const getAlbumOptions = ({
  route,
}: {
  route: RouteProp<RootStackParamList, 'Album'>;
}) => {
  return {
    headerTitle: route.params.item.title,
    headerTransparent: true, // 标题栏透明
    headerTitleStyle: {
      // 头部标题样式
      opacity: route.params.opacity || 0,
    },
    headerBackground: () => {
      return (
        <Animated.View
          style={[
            styles.headerBackground,
            {opacity: route.params.opacity || 0},
          ]}
        />
      );
    },
  };
};
const styles = StyleSheet.create({
  headerBackground: {
    flex: 1,
    backgroundColor: '#fff',
    opacity: 0,
  },
});

const RootStackScreen = () => {
  return (
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
      <Stack.Screen options={getAlbumOptions} name="Album" component={Album} />
    </Stack.Navigator>
  );
};

export type ModalStackParamList = {
  Root: undefined;
  Detail: undefined;
};

const ModalStack = createStackNavigator<ModalStackParamList>();

export type ModalStackNavigation = StackNavigationProp<ModalStackParamList>;

// 嵌套ModalStack目的是让频道详情以全屏模式展示
const ModalStackScreen = () => {
  return (
    <ModalStack.Navigator mode="modal" headerMode="screen">
      <ModalStack.Screen
        name="Root"
        component={RootStackScreen}
        options={{
          headerShown: false,
        }}
      />
      <ModalStack.Screen name="Detail" component={Detail} />
    </ModalStack.Navigator>
  );
};

const Navigator: React.FC = () => {
  return (
    // 堆栈导航器嵌套标签导航器
    <NavigationContainer>
      <ModalStackScreen />
    </NavigationContainer>
  );
};

export default Navigator;
