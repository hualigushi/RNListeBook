import AsyncStorage from '@react-native-community/async-storage';
import Storage, {LoadParams} from 'react-native-storage';

const storage = new Storage({
  size: 1000, // 最大容量
  storageBackend: AsyncStorage, // 数据引擎，程序退出后，数据还能存在
  defaultExpires: 1000 * 3600 * 24 * 7, // 过期时间,7天, null 表示永不过期
  enableCache: true, // 开启缓存，提高性能
  sync: {},
});

// 使用dva的call函数,如果直接使用storage.load则导致calll里面this发生变化，从而导致报错，所以重新封装一次
const load = (params: LoadParams) => {
  return storage.load(params);
};

export {load};
export default storage;
