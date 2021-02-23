import Navigator from '@/navigator/index';
import React from 'react';
import {Provider} from 'react-redux';
import store from '@/config/dva';
import {StatusBar} from 'react-native';
import '@/config/http';
import {RootSiblingParent} from 'react-native-root-siblings';

export default React.memo(() => {
  return (
    <Provider store={store}>
      <RootSiblingParent>
        <Navigator />
      </RootSiblingParent>
      <StatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent
      />
    </Provider>
  );
});
