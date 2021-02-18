import React, {useCallback, useState} from 'react';
import {Platform, StyleSheet} from 'react-native';
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

const Tab: React.FC = () => {
  const [index, setIndex] = useState(1);
  const [routes, setRoutes] = useState<IRoute[]>([
    {key: 'introdution', title: '简介'},
    {key: 'albums', title: '节目'},
  ]);
  const onIndexChange = useCallback((index: number) => {
    setIndex(index);
  }, []);

  const renderScene = useCallback(({route}: {route: IRoute}) => {
    switch (route.key) {
      case 'introdution':
        return <Introdution />;
      case 'albums':
        return <List />;
    }
  }, []);

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
