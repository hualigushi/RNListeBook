import Sound from 'react-native-sound';

// 在静音模式下启用播放
Sound.setCategory('Playback');

let sound: Sound;

const init = (url: string) => {
  return new Promise((resolve, reject) => {
    sound = new Sound(url, '', (error: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(sound);
      }
    });
  });
};

// 播放，知道播放完成才会返回
const play = () => {
  return new Promise((resolve, reject) => {
    if (sound) {
      sound.play((success: any) => {
        if (success) {
          console.log('successfully finished playing');
          resolve(sound);
        } else {
          console.log('playback failed due to audio decoding errors');
          reject();
        }
      });
    } else {
      reject();
    }
  });
};

// 暂停
const pause = () => {
  return new Promise((resolve) => {
    if (sound) {
      sound.pause(() => {
        resolve(1);
      });
    } else {
      resolve(0);
    }
  });
};

// 获取当前播放时间
const getCurrentTime = () => {
  return new Promise((resolve) => {
    if (sound && sound.isLoaded) {
      sound.getCurrentTime(resolve);
    } else {
      resolve(0);
    }
  });
};

// 获取音频时长
const getDuration = () => {
  if (sound) {
    return sound.getDuration();
  }
  return 0;
};

export {init, play, pause, getCurrentTime, getDuration};
