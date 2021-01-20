import Touchable from '@/components/Touchable';
import {
  MaterialTopTabBar,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper'; // iphone 下状态栏高度
import LinearAnimatedGradientTransition from 'react-native-linear-animated-gradient-transition';
import {Text} from 'react-native';
import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';
import {getActiveRouteName} from '@/utils/index';

const mapStateToProps = (state: RootState, props: MaterialTopTabBarProps) => {
  const routeName = getActiveRouteName(props.state);
  const modelState = state[routeName];
  return {
    gradientVisible: modelState.gradientVisible,

    linearColors:
    modelState.carousels && modelState.carousels.length > 0
        ? modelState.carousels[modelState.activeCarouselIndex]
          ? modelState.carousels[modelState.activeCarouselIndex].colors
          : undefined
        : undefined,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

type IProps = MaterialTopTabBarProps & ModelState;

const TopBarBarWrapper: React.FC<IProps> = ({
  linearColors = ['#ccc', '#e2e2e2'],
  gradientVisible,
  indicatorStyle,
  navigation,
  ...props
}) => {
  const goCategory = () => {
    navigation.navigate('Category');
  };

  const getLinearGradient = () => {
    return (
      <>
        {gradientVisible ? (
          <LinearAnimatedGradientTransition
            colors={linearColors}
            style={styles.gradient}
          />
        ) : null}
      </>
    );
  };

  // 渐变色显示时，‘分类’ ‘搜索按钮’ ‘历史记录’ 显示为白色，否则为灰色
  const textStyle = useMemo(() => {
    return gradientVisible ? styles.whiteText : styles.text;
  }, [gradientVisible]);

  // 渐变色显示时，搜索菜单显示为白色
  const activeTintColor = useMemo(() => {
    return gradientVisible ? '#fff' : '#333';
  }, [gradientVisible]);

  const newIndicatorStyle = useMemo(() => {
    return gradientVisible
      ? StyleSheet.compose(indicatorStyle, styles.whiteBackgroundColor)
      : indicatorStyle;
  }, [gradientVisible, indicatorStyle]);

  return (
    <View style={styles.container}>
      <View style={styles.topTabBarView}>
        {getLinearGradient()}
        <MaterialTopTabBar
          {...props}
          navigation={navigation}
          activeTintColor={activeTintColor} // activeTintColor放在prop后面，否则被覆盖
          indicatorStyle={newIndicatorStyle}
          style={styles.tabbar}
        />
        <Touchable style={styles.categoryBtn} onPress={goCategory}>
          <Text style={textStyle}>分类</Text>
        </Touchable>
      </View>
      <View style={styles.bottom}>
        <Touchable style={styles.searchBtn}>
          <Text style={textStyle}>搜索按钮</Text>
        </Touchable>
        <Touchable style={styles.historyBtn}>
          <Text style={textStyle}>历史记录</Text>
        </Touchable>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: getStatusBarHeight(),
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    height: 260,
  },
  tabbar: {
    elevation: 0,
    flex: 1,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  topTabBarView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryBtn: {
    paddingHorizontal: 10,
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderLeftColor: '#ccc',
  },
  bottom: {
    flexDirection: 'row',
    paddingVertical: 7,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  searchBtn: {
    flex: 1,
    paddingLeft: 12,
    height: 30,
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  historyBtn: {
    marginLeft: 24,
  },
  text: {
    color: '#333',
  },
  whiteText: {
    color: '#fff',
  },
  whiteBackgroundColor: {
    backgroundColor: '#fff',
  },
});
export default connector(TopBarBarWrapper);
