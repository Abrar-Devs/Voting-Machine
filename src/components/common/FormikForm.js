import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {Formik} from 'formik';

import globalStyles from '../../utils/styles/globalstyles';
import {MyTextInput} from './MyTextInput';
import {openImagePicker} from '../../utils/helpers';
import Heading from './Heading';

const FormikForm = ({
  title,
  validationSchema,
  formValues,
  handleSubmit,
  showImgPicker = false,
}) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImgSelection = async () => {
    try {
      const selectedImage = await openImagePicker();
      if (selectedImage) {
        setSelectedImage(selectedImage);
      } else {
        console.log('User cancelled image picker');
      }
    } catch (error) {
      console.error('Image picker error: ', error);
    }
  };

  return (
    <Formik
      initialValues={formValues}
      validationSchema={validationSchema}
      onSubmit={values => {
        if (showImgPicker && selectedImage == null) return;
        handleSubmit({...values, profilePic: selectedImage});
      }}
      validateOnMount={true}>
      {formikProps => (
        <ScrollView>
          <View style={[globalStyles.container, styles.container]}>
            <Heading text={title} />
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

            {showImgPicker && (
              <View>
                {selectedImage && (
                  <Image source={selectedImage} style={styles.formImg} />
                )}
                <TouchableOpacity onPress={handleImgSelection}>
                  <Text
                    style={[
                      globalStyles.text,
                      {textDecorationLine: 'underline'},
                    ]}>
                    Choose Image
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            <TouchableOpacity
              style={[globalStyles.btn, styles.btn]}
              onPress={formikProps.handleSubmit}
              disabled={!formikProps.isValid}>
              <Text>{title}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
    marginTop: 30,
    paddingBottom: 20,
  },
  btn: {
    marginTop: 20,
  },
  formImg: {
    backgroundColor: 'pink',
    width: 200,
    height: 200,
  },
});
export default FormikForm;
