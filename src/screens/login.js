import {View, Text} from 'react-native';
import React from 'react';

import {loginFormSchema} from '../validation/yupValidations';

import FormikForm from '../components/common/FormikForm';

const formValues = {
  email: '',
  password: '',
};

const login = () => {
  return (
    <FormikForm
      validationSchema={loginFormSchema}
      formValues={formValues}
      handleSubmit={() => {}}
    />
  );
};

export default login;
