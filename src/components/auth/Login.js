import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'

import FormikForm from '../helpers/FormikForm'
import globalStyles from '../../utils/styles/globalstyles'
import { firebaseLogin } from '../../actions/asyncActions'
import { loginFormSchema } from '../../utils/validation/yupValidations'

const formValues = {
  email: '',
  password: '',
}

const Login = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const handleSubmit = async values => {
    dispatch(firebaseLogin(values))
  }

  return (
    <>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={[globalStyles.text(), globalStyles.linkText]}>Don't have an account?</Text>
      </TouchableOpacity>
      <FormikForm
        title={'Login'}
        validationSchema={loginFormSchema}
        formValues={formValues}
        handleSubmit={handleSubmit}
        btnText='Login'
      />
    </>
  )
}

export default Login
