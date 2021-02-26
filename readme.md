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

## 启动页配置
1. `npm install react-native-splash-screen -S`
项目刚打开后会有一段时间白屏，因为react要去加载js
原理： 在应用刚加载时显示一张图片，等到js加载完成后，在需要的时机将图片替换掉

2. 创建安卓布局文件
在`\android\app\src\main\res`（用来存放android的资源文件，安卓系统会对mipmap文件夹下的图片进行纹理技术优化）创建文件夹layout
layout文件夹中创建文件`launch_screen.xml`, 这是应用刚打开时显示的页面
```
launch_screen.xml

<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
              android:layout_width="match_parent"
              android:layout_height="match_parent"
              android:orientation="vertical">
        <ImageView 
        android:layout_width="match_parent" 
        android:layout_height="match_parent" 
        android:src="@drawable/launch_screen"/>
</RelativeLayout>
```

3. 在`\android\app\src\main\res`创建文件夹drawable，存放图片

4. 在`\android\app\src\main\res\values`下创建`colors.xml`
```
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="colorPrimaryDark">#FFFFFF</color>
</resources>
```

4. `\android\app\src\main\res\values\styles.xml`中新增主题
```
 <style name="SplashScreenTheme" parent="SplashScreen_SplashTheme">
    <item name="colorPrimaryDark">@color/colorPrimaryDark</item>
  </style>
```

5. `android\app\src\main\java\com\rnlistebook\MainActivity.java`
```
package com.rnlistebook;

import com.facebook.react.ReactActivity;
import android.os.bundle;
import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "RNListeBook";
  }

  // 重写onCreate方法，整个RN项目加载的入口
  @Override
  protected void onCreate(Bundle savedInstanceState){
    SplashScreen.show(this, R.style.SplashScreenTheme);
    super.onCreate(savedInstanceState);
  }
}
```



7. 隐藏图片
`src\navigator\index.tsx`

```
import Splash from 'react-native-splash-screen';
...
useEffect(() => {
    Splash.hide();
  }, []);
```

## 打包分包配置
1. `android\build.gradle`

```
defaultConfig {
  ...
  multiDexEnabled true
}

dependencies {
  ...
  implementation 'anroidx.multidex:multidex:2.0.1'
}
```

2. `\android\app\src\main\java\com\rnlistebook\MainApplication.java`
```
import androidx.multidex.MultiDexApplication;
public class MainApplication extends MultiDexApplication implements ReactApplication {
```

## 打包版本配置 
1. `.env`
```
APP_NAME=听书
VERSIONCODE=1
VERSIONNAME=1.0.0
```

2. `android\app\build.gradle`
```
defaultConfig {
  versionCode project.env.get("VERSIONCODE").toInteger()
  versionName project.env.get("VERSIONNAME")
}
```

3. `android\app\src\main\res\values\strings.xml`
```
<resources>
    <string name="app_name">@string/APP_NAME</string>
</resources>
```

4. 根目录新建 `.env.production`
修改 APP_URL 为生产环境地址(android 9.0 以上禁止使用http协议)

解决方法
`android\app\src\main\res\xml\network_security_config.xml`
```
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
<base-config cleartextTrafficPermitted="true" />
</network-security-config>
```

`\android\app\src\main\AndroidManifest.xml`
```
      android:networkSecurityConfig="@xml/network_security_config"
```

## 生产环境去除打印
重置console函数
`index.js`
```
if (__DEV__) {
  const emptyFunc = () => {};
  global.console.info = emptyFunc;
  global.console.log = emptyFunc;
  global.console.warn = emptyFunc;
  global.console.error = emptyFunc;
}
```

## 应用图标
替换`android\app\src\main\res`下mipmap的图片