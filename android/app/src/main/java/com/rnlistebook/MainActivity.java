package com.rnlistebook;

import com.facebook.react.ReactActivity;
import android.os.Bundle;
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
    // 显示启动屏，第二个参数是自定义主题的引用
    SplashScreen.show(this, R.style.SplashScreenTheme);
    super.onCreate(savedInstanceState);
  }
}
