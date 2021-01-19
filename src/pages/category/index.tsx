import {ICategory} from '@/models/category';
import {RootState} from '@/models/index';
import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import _ from 'lodash';
import {ScrollView} from 'react-native-gesture-handler';
import Item from './Item';
import {RootStackNavigation} from '@/navigator/index';
import HeaderRightBtn from './HeaderrightBtn';
import Touchable from '@/components/Touchable';

const mapStateToProps = ({category}: RootState) => {
  return {
    myCategorys: category.myCategorys,
    categorys: category.categorys,
    isEdit: category.isEdit,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;
interface Iprops extends ModelState {
  navigation: RootStackNavigation;
}
const fixedItems = [0, 1]; // 第0项和第1项不能被删除

const Category: React.FC<Iprops> = ({
  dispatch,
  isEdit,
  myCategorys,
  categorys,
  navigation,
}) => {
  const [localmyCategorys, setLocalmyCategorys] = useState<ICategory[]>(
    myCategorys,
  );

  navigation.setOptions({
    headerRight: () => <HeaderRightBtn onSubmit={onSubmit} />,
  });

  useEffect(() => {
    return () => {
      // 退出时退出编辑状态
      dispatch({
        type: 'category/toggle',
        payload: {
          isEdit: false,
        },
      });
    };
  }, [dispatch]);

  const onSubmit = useCallback(
    () =>
      dispatch({
        type: 'category/toggle',
        payload: {
          myCategorys: localmyCategorys,
        },
      }),
    [dispatch, localmyCategorys],
  );

  const classifyGroup = _.groupBy(categorys, (item) => {
    item.classify;
  });

  // 长按进入编辑
  const onLongPress = () => {
    dispatch({
      type: 'category/toggle',
      payload: {
        isEdit: true,
      },
    });
  };

  const onPress = (item: ICategory, index: number, selected: boolean) => {
    const disabled = fixedItems.indexOf(index) > -1;
    if (disabled) {
      return;
    }
    if (isEdit) {
      if (selected) {
        setLocalmyCategorys((prev) => {
          return prev.filter((selectedItem) => selectedItem.id !== item.id);
        });
      } else {
        setLocalmyCategorys((prev) => {
          return prev.concat([item]);
        });
      }
    }
  };

  const renderUnSelectedItem = (item: ICategory, index: number) => {
    <Touchable
      key={item.id}
      onPress={() => onPress(item, index, false)}
      onLongPress={onLongPress}>
      <Item data={item} isEdit={isEdit} selected={false} />;
    </Touchable>;
  };

  const renderItem = (item: ICategory, index: number) => {
    const disabled = fixedItems.indexOf(index) > -1;
    return (
      <Touchable
        key={item.id}
        onPress={() => onPress(item, index, true)}
        onLongPress={onLongPress}>
        <Item data={item} isEdit={isEdit} selected disabled={disabled} />;
      </Touchable>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.classifyName}>我的分类</Text>
      <View style={styles.classifyView}>
        {localmyCategorys.map(renderItem)}
      </View>
      <View>
        {Object.keys(classifyGroup).map((classify) => {
          return (
            <View key={classify}>
              <Text style={styles.classifyName}>{classify}</Text>
              <View style={styles.classifyView}>
                {classifyGroup[classify].map((item, index) => {
                  if (
                    localmyCategorys.find(
                      (selectedItem) => selectedItem.id === item.id,
                    )
                  ) {
                    return null;
                  }
                  return renderUnSelectedItem(item, index);
                })}
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'f3f6f6',
  },
  classifyName: {
    fontSize: 16,
    marginTop: 14,
    marginBottom: 8,
    marginLeft: 10,
  },
  classifyView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5,
  },
});
export default connector(Category);
