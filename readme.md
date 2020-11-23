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