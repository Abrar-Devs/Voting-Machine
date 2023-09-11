import React from 'react';

import {loginFormSchema} from '../validation/yupValidations';
import FormikForm from '../components/common/FormikForm';

const formValues = {
  email: '',
  password: '',
};

const Login = () => (
  <FormikForm
    validationSchema={loginFormSchema}
    formValues={formValues}
    handleSubmit={() => {}}
  />
);

export default Login;
