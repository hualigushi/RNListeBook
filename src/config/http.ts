import axios from 'axios';
import Config from 'react-native-config';

axios.defaults.baseURL = Config.API_URL;
axios.defaults.headers.common.icode = 'mukewang202007302149';
axios.interceptors.request.use(
  function (config: any) {
    config.headers.icode='mukewang202007302149';
    return config;
  },
  function (error: any) {
    console.log('--error', error);
    return Promise.reject(error);
  },
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response: {data: any}) {
    // console.log('------response', response);
    return response.data;
  },
  function (error: any) {
    // Do something with response error
    return Promise.reject(error);
  },
);
