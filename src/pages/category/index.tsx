import {ICategory} from '@/models/category';
import {RootState} from '@/models/index';
import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import _ from 'lodash';
import {ScrollView} from 'react-native-gesture-handler';
import Item, {itemHeight, itemWidth, margin, parentWidth} from './Item';
import {RootStackNavigation} from '@/navigator/index';
import HeaderRightBtn from './HeaderRightBtn';
import Touchable from '@/components/Touchable';
import {DragSortableView} from 'react-native-drag-sort';

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

  const onSubmit = useCallback(() => {
    dispatch({
      type: 'category/toggle',
      payload: {
        myCategorys: localmyCategorys,
      },
    });
    if (isEdit) {
      navigation.goBack();
    }
  }, [dispatch, isEdit, localmyCategorys, navigation]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderRightBtn onSubmit={onSubmit} />,
    });
  }, [navigation, onSubmit]);

  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
      // 退出时退出编辑状态
      dispatch({
        type: 'category/setState',
        payload: {
          isEdit: false,
        },
      });
      navigation.dispatch(e.data.action);
    });
  }, [dispatch, navigation]);

  const classifyGroup = _.groupBy(categorys, (item) => {
    return item.classify;
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

  const onPress = useCallback(
    (item: ICategory, index: number, selected: boolean) => {
      const disabled = fixedItems.indexOf(index) > -1;
      if (disabled) {
        return;
      }
      if (isEdit) {
        if (selected) {
          const newList = localmyCategorys.filter(
            (selectedItem) => selectedItem.id !== item.id,
          );
          setLocalmyCategorys(newList);
        } else {
          const newList = localmyCategorys.concat([item]);
          setLocalmyCategorys(newList);
        }
      }
    },
    [isEdit, localmyCategorys],
  );

  const renderUnSelectedItem = (item: ICategory, index: number) => {
    return (
      <Touchable
        key={item.id}
        onPress={() => onPress(item, index, false)}
        onLongPress={onLongPress}>
        <Item data={item} isEdit={isEdit} selected={false} />
      </Touchable>
    );
  };

  const renderItem = (item: ICategory, index: number) => {
    const disabled = fixedItems.indexOf(index) > -1;
    return (
      <Item
        key={item.id}
        data={item}
        isEdit={isEdit}
        selected
        disabled={disabled}
      />
    );
  };

  const onDataChange = useCallback((data: ICategory[]) => {
    setLocalmyCategorys(data);
  }, []);

  const onClickItem = useCallback(
    (data: ICategory[], item: ICategory) => {
      onPress(item, data.indexOf(item), true);
    },
    [onPress],
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.classifyName}>我的分类</Text>
      <View style={styles.classifyView}>
        <DragSortableView
          dataSource={localmyCategorys}
          fixedItems={fixedItems}
          renderItem={renderItem}
          sortable={isEdit}
          keyExtractor={(item) => item.id}
          onDataChange={onDataChange}
          parentWidth={parentWidth}
          childrenWidth={itemWidth}
          childrenHeight={itemHeight}
          marginChildrenTop={margin}
          onClickItem={onClickItem}
        />
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
    backgroundColor: '#f3f6f6',
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
