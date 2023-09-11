import React from 'react';
import FormikForm from '../components/common/FormikForm';

import {registerFormSchema} from '../validation/yupValidations';
const formValues = {
  firstName: '',
  email: '',
  cnic: '',
  password: '',
};

const Register = () => (
  <FormikForm
    validationSchema={registerFormSchema}
    formValues={formValues}
    handleSubmit={() => {}}
  />
);

export default Register;
