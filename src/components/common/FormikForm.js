import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native'
import { Formik } from 'formik'
import React, { useState } from 'react'

import globalStyles from '../../utils/styles/globalstyles'
import { MyTextInput } from './MyTextInput'
import { openImagePicker } from '../../utils/helpers'
import Heading from './Heading'
import DropdownPicker from './DropdownPicker'

const FormikForm = ({
  title,
  validationSchema,
  formValues,
  handleSubmit,
  showImgPicker = false,
  constitutions,
  btnText,
  imgText,
  children,
}) => {
  const [selectedImage, setSelectedImage] = useState(null)

  const handleImgSelection = async () => {
    try {
      const selectedImage = await openImagePicker()
      if (selectedImage) setSelectedImage(selectedImage)
    } catch (error) {
      console.error('Image picker error: ', error)
    }
  }

  const submit = values => {
    if (showImgPicker && selectedImage == null) return
    handleSubmit({ ...values, profilePic: selectedImage })
  }

  return (
    <Formik
      initialValues={formValues}
      validationSchema={validationSchema}
      onSubmit={values => submit(values)}
      validateOnMount={true}
    >
      {formikProps => (
        <ScrollView>
          <View style={[globalStyles.container, styles.container]}>
            <Heading text={title} />
            {Object.keys(formValues).map(value => {
              if (value != 'constitution')
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
                )
            })}
            {constitutions && (
              <DropdownPicker
                label='Your Constitution'
                items={constitutions}
                selectedValue={formikProps.values.constitution}
                onValueChange={formikProps.handleChange('constitution')}
              />
            )}
            {showImgPicker && (
              <View>
                {selectedImage && <Image source={selectedImage} style={styles.formImg} />}
                <TouchableOpacity onPress={handleImgSelection}>
                  <Text style={[globalStyles.text(), { textDecorationLine: 'underline' }]}>
                    {imgText}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            {children}
            <TouchableOpacity
              style={[globalStyles.btn, styles.btn]}
              onPress={formikProps.handleSubmit}
              disabled={!formikProps.isValid}
            >
              <Text>{btnText}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </Formik>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    paddingBottom: 30,
  },
  btn: {
    marginTop: 20,
  },
  formImg: {
    backgroundColor: 'pink',
    width: 200,
    height: 200,
  },
})

export default FormikForm
