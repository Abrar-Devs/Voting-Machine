import React from 'react';

import {loginFormSchema} from '../../validation/yupValidations';
import FormikForm from '../common/FormikForm';
import {auth} from '../../config/firebase';
import {signInWithEmailAndPassword, signOut} from 'firebase/auth';

const formValues = {
  email: '',
  password: '',
};

const handleSubmit = async values => {
  console.log(auth.currentUser);
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      values.email,
      values.password,
    );

    console.log('User signed in successfully:', userCredential.user);
  } catch (error) {
    console.log(error);
  }
};
const Login = () => {
  return (
    <FormikForm
      title={'Sign In'}
      validationSchema={loginFormSchema}
      formValues={formValues}
      handleSubmit={handleSubmit}
    />
  );
};

export default Login;
