import {FieldInputProps, FormikProps} from 'formik';
import {result} from 'lodash';
import React from 'react';
import {StyleSheet, Text, TextInput, TextInputProps, View} from 'react-native';

interface IProps extends TextInputProps {
  field: FieldInputProps<any>;
  form: FormikProps<any>;
}
const Input: React.FC<IProps> = React.memo(({field, form, ...rest}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        {...rest}
        onChange={form.handleChange(field.name)}
        onBlur={form.handleBlur(field.name)}
        value={form.values[field.name]}
      />
      <View>
        <Text style={styles.error}>
          {form.touched[field.name] && form.errors[field.name]}
        </Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  input: {
    height: 40,
    paddingHorizontal: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  error: {
    position: 'absolute',
    color: 'red',
    marginTop: 5,
    marginLeft: 10,
    fontSize: 12,
  },
});
export default Input;
