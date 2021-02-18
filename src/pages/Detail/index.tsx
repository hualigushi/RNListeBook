import {RootState} from '@/models/index';
import {ModalStackParamList} from '@/navigator/index';
import {RouteProp} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';

const mapStateToProps = ({player}: RootState) => {
  return {
    soundUrl: player.soundUrl,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  route: RouteProp<ModalStackParamList, 'Detail'>;
}
const Detail: React.FC<IProps> = ({route, dispatch}) => {
  useEffect(() => {
    dispatch({
      type: 'player/fetchShow',
      payload: {
        id: route.params.id,
      },
    });
  }, [dispatch, route.params.id]);

  return (
    <View>
      <Text>Detail</Text>
      <Text>{route.params.id}</Text>
    </View>
  );
};

export default connector(Detail);
