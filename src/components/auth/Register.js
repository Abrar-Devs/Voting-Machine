import React from 'react';

import FormikForm from '../common/FormikForm';
import {registerFormSchema} from '../../validation/yupValidations';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import {db, auth, storage} from '../../config/firebase';
import {collection, addDoc} from 'firebase/firestore';

const formValues = {
  firstName: '',
  email: '',
  cnic: '',
  password: '',
};

//abrar@gmail.com
//1234567890123
//aA1!qwerty
const handleSubmit = async values => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password,
    );
    const user = userCredential.user;

    //upload the pic and get download url
    const filesFolderRef = ref(storage, `profilePics/${user.uid}`);
    await uploadBytes(filesFolderRef, values.profilePic.uri);
    const downloadURL = await getDownloadURL(filesFolderRef);

    //add the user to collection
    const usersCollectionRef = collection(db, 'users');
    await addDoc(usersCollectionRef, {...values, profilePic: downloadURL});

    console.log('user created successfully');
  } catch (err) {
    console.error(err);
  }
};

const Register = () => {
  return (
    <FormikForm
      title={'Register'}
      validationSchema={registerFormSchema}
      formValues={formValues}
      handleSubmit={handleSubmit}
      showImgPicker={true}
    />
  );
};

export default Register;
