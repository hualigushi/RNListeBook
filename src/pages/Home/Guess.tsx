import Touchable from '@/components/Touchable';
import {IGUESS} from '@/models/home';
import {RootState} from '@/models/index';
import React, {useCallback, useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {connect, ConnectedProps} from 'react-redux';
import Icon from '@/assets/iconfont';

const mapStateToProps = ({home}: RootState) => {
  return {
    guess: home.guess,
  };
};
const connector = connect(mapStateToProps);
type ModelState = ConnectedProps<typeof connector>;
const Guess: React.FC<ModelState> = ({dispatch, guess}) => {
  const fetch = useCallback(() => {
    dispatch({
      type: 'home/fetchGuess',
    });
  }, [dispatch]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const renderItem = ({item}: {item: IGUESS}) => {
    return (
      <Touchable style={styles.item}>
        <Image source={{uri: item.image}} style={styles.image} />
        <Text numberOfLines={2}>{item.title}</Text>
      </Touchable>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerRight}>
          <Icon name="icon-xihuan" />
          <Text style={styles.headerTitle}>猜你喜欢</Text>
        </View>
        <View style={styles.headerLeft}>
          <Text style={styles.moreText}>更多</Text>
          <Icon name="icon-more" />
        </View>
      </View>
      <FlatList
        style={styles.list}
        numColumns={3}
        data={guess}
        renderItem={renderItem}
      />
      <Touchable style={styles.changeGuess} onPress={fetch}>
        <Icon name="icon-huanyipi" color="red" />
        <Text style={styles.changeGuessText}>换一批</Text>
      </Touchable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 16,
  },
  item: {
    flex: 1,
    marginVertical: 6,
    marginHorizontal: 10,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomColor: '#efefef',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    marginLeft: 5,
    color: '#333',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moreText: {
    color: '#6f6f6f',
  },
  changeGuess: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  changeGuessText: {
    marginLeft: 5,
  },
  list: {
    padding: 10,
  },
});
export default connector(Guess);
