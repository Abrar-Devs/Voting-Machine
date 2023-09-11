import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {Formik} from 'formik';

import globalStyles from '../../utils/styles/globalstyles';
import {MyTextInput} from './MyTextInput';

const FormikForm = ({validationSchema, formValues, handleSubmit}) => (
  <Formik
    initialValues={formValues}
    validationSchema={validationSchema}
    onSubmit={(values, {setSubmitting}) => {
      handleSubmit();
    }}
    validateOnMount={true}>
    {formikProps => (
      <View style={[globalStyles.container, styles.container]}>
        {Object.keys(formValues).map(value => {
          return (
            <MyTextInput
              key={value}
              label={value}
              name={value}
              secureTextEntry={value === 'password' ? true : false}
              placeholder={value}
              onChangeText={formikProps.handleChange(value)}
              onBlur={formikProps.handleBlur(value)}
              value={formikProps.values[value]}
              style={globalStyles.input}
              touched={formikProps.touched[value]}
              error={formikProps.errors[value]}
            />
          );
        })}

        <TouchableOpacity
          style={[globalStyles.btn, styles.btn]}
          onPress={formikProps.handleSubmit}
          disabled={!formikProps.isValid || formikProps.isSubmitting}>
          <Text>Sign In</Text>
        </TouchableOpacity>
      </View>
    )}
  </Formik>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    gap: 10,
  },
  btn: {
    marginTop: 20,
  },
});
export default FormikForm;
