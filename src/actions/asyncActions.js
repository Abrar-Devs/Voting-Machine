import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import {collection, addDoc, updateDoc, doc} from 'firebase/firestore';

import {db, auth, storage} from '../config/firebase';
import {getAllDocs, getDocByKey, getDocsByKey} from '../utils/helpers';

export const firebaseLogin = createAsyncThunk(
  'user/login',
  async ({email, password}) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      console.log('user credentials:', userCredential.user.uid);
      const userDetails = await getDocByKey('users', 'email', email);
      console.log('User details', userDetails);
      return userDetails;
    } catch (error) {
      console.log(error.message);
    }
  },
);

export const checkSession = createAsyncThunk('user/checkSession', async () => {
  console.log('before check session');
  if (!auth.currentUser) return;
  console.log('after check session');
  try {
    const userDetails = await getDocByKey(
      'users',
      'email',
      auth.currentUser?.email,
    );
    console.log('User details in checksession ', userDetails);
    return userDetails;
  } catch (error) {
    console.log(error.message);
  }
});

export const firebaseRegister = createAsyncThunk(
  'user/register',
  async values => {
    try {
      console.log('in firebase register');
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password,
      );
      const user = userCredential.user;

      const filesFolderRef = ref(storage, `profilePics/${user.uid}`);
      await uploadBytes(filesFolderRef, values.profilePic.uri);
      const downloadURL = await getDownloadURL(filesFolderRef);

      console.log('before adding user to collection');
      const usersCollectionRef = collection(db, 'users');
      console.log('adding  user to collection');
      await addDoc(usersCollectionRef, {...values, profilePic: downloadURL});
      console.log('user added');

      const newUser = {...values, profilePic: downloadURL};
      console.log('user created successfully', newUser);
      auth.currentUser = newUser;
      return newUser;
    } catch (err) {
      console.error(err);
    }
  },
);

export const getAllConstitutions = createAsyncThunk(
  'user/getAllConstitutions',
  async () => {
    try {
      const constitutions = await getAllDocs('constitutions');
      return constitutions;
    } catch (error) {
      console.log(error.message);
    }
  },
);

export const submitCandidateApplication = createAsyncThunk(
  'user/candidateApplication',
  async values => {
    try {
      console.log('in firebase candidateApplication');

      const filesFolderRef = ref(storage, `partySymbols/${values.partyName}`);
      await uploadBytes(filesFolderRef, values.partySymbol.uri);
      const downloadURL = await getDownloadURL(filesFolderRef);

      console.log('before adding application to collection');
      const usersCollectionRef = collection(db, 'candidates');
      console.log('adding  application to collection');

      const applicationObj = {...values, partySymbol: downloadURL};
      await addDoc(usersCollectionRef, applicationObj);
      console.log('application added');

      return applicationObj;
    } catch (err) {
      console.error(err);
    }
  },
);

export const getCandidateApplications = createAsyncThunk(
  'user/getCandidateApplications',
  async () => {
    try {
      const applications = await getDocsByKey('candidates', 'approved', false);
      console.log('in getCandidateApplications', applications);
      return applications;
    } catch (error) {
      console.log(error.message);
    }
  },
);

export const approveCandidateApplication = createAsyncThunk(
  'user/approveCandidateApplication',
  async (id, {getState}) => {
    try {
      const state = getState();
      const applicationRef = doc(db, 'candidates', id);
      await updateDoc(applicationRef, {approved: true});

      const applicationsLeft = state.applications.filter(item => item.id != id);
      return applicationsLeft;
    } catch (error) {
      console.log(error.message);
    }
  },
);

export const getCandidateProfile = createAsyncThunk(
  'user/getCandidateProfile',
  async () => {
    console.log('in getCandidateProfile');
    try {
      const candidProfile = await getDocByKey(
        'candidates',
        'user',
        auth.currentUser.email,
      );
      return candidProfile;
    } catch (error) {
      console.log(error.message);
    }
  },
);
