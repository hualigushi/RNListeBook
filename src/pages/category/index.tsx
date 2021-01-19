import {ICategory} from '@/models/category';
import {RootState} from '@/models/index';

import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import _ from 'lodash';
import {ScrollView} from 'react-native-gesture-handler';
import Item from './Item';
import {RootStackNavigation} from '@/navigator/';
import HeaderRightBtn from './HeaderrightBtn';

const mapStateToProps = ({category}: RootState) => {
  return {
    myCategorys: category.myCategorys,
    categorys: category.categorys,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface Iprops extends ModelState {
  navigation: RootStackNavigation;
}

const Category: React.FC<Iprops> = ({
  dispatch,
  myCategorys,
  categorys,
  navigation,
}) => {
  const onSubmit = useCallback(
    () =>
      dispatch({
        type: 'category/toggle',
      }),
    [dispatch],
  );

  navigation.setOptions({
    headerRight: () => <HeaderRightBtn onSubmit={onSubmit} />,
  });

  const [localmyCategorys, setLocalmyCategorys] = useState<ICategory[]>(
    myCategorys,
  );

  const classifyGroup = _.groupBy(categorys, (item) => {
    item.classify;
  });
  const renderItem = (item: ICategory) => {
    return <Item data={item} />;
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
                {classifyGroup[classify].map(renderItem)}
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
