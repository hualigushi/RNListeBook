/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React, {useCallback} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import _ from 'lodash';

const Touchable: React.FC<TouchableOpacityProps> = React.memo(
  ({style, onPress, ...rest}) => {
    const touchableStyle = rest.disabled ? [style, styles.disabled] : style;

    let throttleOnPress;
    if (typeof onPress === 'function') {
      throttleOnPress = useCallback(
        _.throttle(onPress, 1000, {
          leading: true,
          trailing: false,
        }),
        [onPress],
      );
    }

    return (
      <TouchableOpacity
        onPress={throttleOnPress}
        style={touchableStyle}
        {...rest}
        activeOpacity={0.8}
      />
    );
  },
);

const styles = StyleSheet.create({
  disabled: {
    opacity: 0.5,
  },
});
export default Touchable;
