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

2. index.js
`import 'react-native-gesture-handler';`

3. 堆栈式导航器 
`npm install @react-navigation/stack`

```
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
  HeaderStyleInterpolators,
  StackNavigationProp,
} from '@react-navigation/stack';
import Home from '@/pages/Home';
import Detail from '@/pages/Detail';
import {Platform, StyleSheet} from 'react-native';

export type RootStackParamList = {
  Home: undefined;
  Detail: {
    // 导航传参
    id: number;
  };
};

export type RootStackNavigation = StackNavigationProp<RootStackParamList>;

const Stack = createStackNavigator<RootStackParamList>();
const Navigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        headerMode="float" // 所有页面共用一个标题栏
        screenOptions={{
          headerTitleAlign: 'center',
          headerStyleInterpolator: HeaderStyleInterpolators.forUIKit, // 跳转页面标题栏加载方向为从右向左
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // 跳转页面卡片加载方向为从右向左
          gestureEnabled: true, // 手势
          gestureDirection: 'horizontal', // 手势为水平方向
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
          options={{headerTitle: '首页'}}
          name="Home"
          component={Home}
        />
        <Stack.Screen
          options={{headerTitle: '详情页'}}
          name="Detail"
          component={Detail}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;

```

```
import React from 'react';
import {Button, Text, View} from 'react-native';
import {RootStackNavigation} from '../navigator';

interface Iprops {
  navigation: RootStackNavigation;
}
const Home: React.FC<Iprops> = ({navigation}) => {
  const onPress = () => {
    navigation.navigate('Detail', {
      id: 100
    });
  };
  return (
    <View>
      <Text>Home</Text>
      <Button title="跳转" onPress={onPress} />
    </View>
  );
};

export default Home;
```

```
import {RouteProp} from '@react-navigation/native';
import React from 'react';
import {Text, View} from 'react-native';
import {RootStackParamList} from '../navigator';

interface IProps {
  route: RouteProp<RootStackParamList, 'Detail'>;
}
const Detail: React.FC<IProps> = ({route}) => {
  return (
    <View>
      <Text>Detail</Text>
      <Text>{route.params.id}</Text>
    </View>
  );
};

export default Detail;
```

4. 标签导航器
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
1. `npm install @react-navigation/material-top-tabs react-native-tab-view -S`

## 轮播图
1. `npm install react-native-snap-carousel -S`
2. `npm install @types/react-native-snap-carousel -D`