## 创建项目
`npx react-native init AwesomeTSProject --template react-native-template-typescript`

## 运行项目
`npx react-native run-android`

## 多环境配置
1. `npm install react-native-config -S`

2. 根目录创建 .env 文件
```
API_URL=https://myapi.com
GOOGLE_MAPS_API_KEY=abcdefgh
```

3. `android/app/build.gradle` 文件最后添加
`apply from: project(':react-native-config').projectDir.getPath() + "/dotenv.gradle"`

4. 文件中使用
```
import Config from "react-native-config";

Config.API_URL; // 'https://myapi.com'
Config.GOOGLE_MAPS_API_KEY; // 'abcdefgh'
```

## 路径别名配置
1. `npm install babel-plugin-module-resolver -D`

2. `babel.config.js`

```
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@/utils': './src/utils',
          '@/pages': './src/pages',
          '@/navigator': './src/navigator',
          '@/models': './src/models',
          '@/config': './src/config',
          '@/assets': './src/assets',
        },
      },
    ],
  ],
};
```

3. `tsconfig.json`

```
"baseUrl": "./src",                       /* Base directory to resolve non-absolute module names. */
"paths": {
    "@/assets/*":["assets/*"],
    "@/components/*":["components/*"],
    "@/config/*":["config/*"],
    "@/models/*":["models/*"],
    "@/navigator/*":["navigator/*"],
    "@/pages/*":["pages/*"],
    "@/utils/*":["utils/*"],
},  
```

## 导航器 react-navigation
1. `npm install @react-navigation/native`

   `npm install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view`

2. 堆栈式导航器 
`npm install @react-navigation/stack`

3. 标签导航器
`npm install @react-navigation/bottom-tabs`

## DVA
1. ` npm install dva-core-ts react-redux -S`
2. `npm install @types/react-redux -D`
3. `npm install dva-loading-ts -S`

## 图标
1. `npm install react-native-svg -S`

2. `npm install react-native-iconfont-cli -D`
   用纯JS把iconfont.cn的图标转换成RN组件，不依赖字体，支持多色彩，支持热更新

3. 生成配置文件
   `npx iconfont-init`  

4. 修改`iconfont.json`文件
5. 开始生成React-Native标准组件
    `npx iconfont-rn`

## 顶部标签导航器
`npm install @react-navigation/material-top-tabs react-native-tab-view -S`

## 轮播图
1. `npm install react-native-snap-carousel -S`
2. `npm install @types/react-native-snap-carousel -D`

## 安卓端不支持阴影效果，只支持投影效果

## 渐变色
`npm install react-native-linear-gradient -S`

## 渐变色过渡动画
`npm install react-native-linear-animated-gradient-transition -S`

## 样式合并
`StyleSheet.compose(indicatorStyle,styles.whiteBackgroundColor)`

## 本地持久库
`npm install @react-native-community/async-storage -S`  只支持字符串类型
`npm install react-native-storage -S` 二次封装

## 处理数据结构
`npm install lodash @types/lodash -S`

## 按钮库
`npm install react-navigation-header-buttons -S`

## 拖拽
`npm install react-native-drag-sort -S`

## 动态生成dva model
`npm install dva-model-extend -S`

## 根目录创建 index.d.ts 类型声明dva-model-extend文件

## 导入png图片需要在index.d.ts中声明类型
`declare module '*.png';`

## 频道组件标题背景透明模糊效果
`npm install @react-native-community/blur -S`

## 手势响应系统
react native是有手势响应系统的，比如View组件就有一系列的函数用来响应用户的手势操作，但是这个系统是在js线程上的。但是react native中又有一些组件是使用原生组件渲染的，比如ScrollView,这就导致View组件的函数无法阻止原生组件的一些响应，比如想在ScrollView中创建一个不滚动的区域，这是做不到的，而且运行在js线程上，性能也较差一些

社区更好用的手势响应库 react-native-gesture-handler

## 播放声音
`npm install react-native-sound -S`

## 声音进度条
`npm install react-native-slider-x -S`

## 底部标签播放进度条
底层以来react-native-svg, 生成圆形进度条
`npm install react-native-circular-progress -S`

## realm数据库
`npm install realm -S`

## 视频播放
`npm install react-native-video react-native-video-custom-controls -S`
`npm i --save-dev @types/react-native-video`

## 表单
`npm install formik -S`

## 表单校验
`npm install yup -S`
`npm install @types/yup -D`

## 信息提示
`npm install react-native-root-toast -S`