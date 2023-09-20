import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import FormikForm from '../common/FormikForm';
import { registerFormSchema } from '../../utils/validation/yupValidations';
import { firebaseRegister } from '../../actions/asyncActions';

const formValues = {
  name: '',
  email: '',
  cnic: '',
  password: '',
  constitution: '',
};

const Register = () => {
  const constitutions = useSelector(state => state.constitutions);
  const dispatch = useDispatch();

  const handleSubmit = async values => {
    dispatch(firebaseRegister(values));
  };

  return (
    <FormikForm
      title="Register"
      validationSchema={registerFormSchema}
      formValues={formValues}
      handleSubmit={handleSubmit}
      showImgPicker={true}
      constitutions={constitutions}
      btnText="Register"
      imgText="Choose profile pic"
    />
  );
};

export default Register;

//aA1!qwerty
