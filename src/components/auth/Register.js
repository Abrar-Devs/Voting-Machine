import React from 'react';

import FormikForm from '../common/FormikForm';
import {registerFormSchema} from '../../utils/validation/yupValidations';

import {useSelector, useDispatch} from 'react-redux';
import {firebaseRegister} from '../../actions/asyncActions';

//abrar@gmail.com
//aA1!qwerty
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
      title={'Register'}
      validationSchema={registerFormSchema}
      formValues={formValues}
      handleSubmit={handleSubmit}
      showImgPicker={true}
      constitutions={constitutions}
    />
  );
};

export default Register;
