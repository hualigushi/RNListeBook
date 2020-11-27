import Navigator from '@/navigator/index';
import React from 'react';
import {Provider} from 'react-redux';
import store from '@/config/dva';

export default React.memo(() => {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
});
