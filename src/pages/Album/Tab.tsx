import {IProgram} from '@/models/album';
import React, {useCallback, useState} from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  StyleSheet,
} from 'react-native';
import {
  NativeViewGestureHandler,
  PanGestureHandler,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import {SceneRendererProps, TabBar, TabView} from 'react-native-tab-view';
import Introdution from './Introdution';
import List from './List';

interface IRoute {
  key: string;
  title: string;
}

interface IState {
  routes: IRoute[];
}

export interface ITabProps {
  panRef: React.RefObject<PanGestureHandler>;
  tapRef: React.RefObject<TapGestureHandler>;
  nativeRef: React.RefObject<NativeViewGestureHandler>;
  onScrollDrag: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onItemPress: (data: IProgram, index: number) => void;
}

const Tab: React.FC<ITabProps> = ({
  panRef,
  tapRef,
  nativeRef,
  onScrollDrag,
  onItemPress,
}) => {
  const [index, setIndex] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [routes, setRoutes] = useState<IRoute[]>([
    {key: 'introdution', title: '简介'},
    {key: 'albums', title: '节目'},
  ]);

  const onIndexChange = useCallback((i: number) => {
    setIndex(i);
  }, []);

  const renderScene = useCallback(
    ({route}: {route: IRoute}) => {
      switch (route.key) {
        case 'introdution':
          return <Introdution />;
        case 'albums':
          return (
            <List
              panRef={panRef}
              tapRef={tapRef}
              nativeRef={nativeRef}
              onScrollDrag={onScrollDrag}
              onItemPress={onItemPress}
            />
          );
      }
    },
    [nativeRef, onItemPress, onScrollDrag, panRef, tapRef],
  );

  const renderTabBar = useCallback(
    (props: SceneRendererProps & {navigationState: IState}) => {
      return (
        <TabBar
          {...props}
          scrollEnabled
          labelStyle={styles.label}
          tabStyle={styles.tabStyle}
          style={styles.tabbar}
          indicatorStyle={styles.indicator}
        />
      );
    },
    [],
  );
  return (
    <TabView
      navigationState={{
        routes,
        index,
      }}
      onIndexChange={onIndexChange}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
    />
  );
};

const styles = StyleSheet.create({
  tabStyle: {
    width: 80,
  },
  label: {
    color: '#000',
  },
  tabbar: {
    backgroundColor: '#fff',
    ...Platform.select({
      android: {
        elevation: 0,
        borderBottomColor: '#e3e3e3',
        borderBottomWidth: StyleSheet.hairlineWidth,
      },
    }),
  },
  indicator: {
    backgroundColor: '#eb6d48',
    borderLeftWidth: 20,
    borderRightWidth: 20,
    borderColor: '#fff',
  },
});
export default Tab;
