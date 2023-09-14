import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {db, auth, storage} from '../../config/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import {collection, addDoc} from 'firebase/firestore';
import {getAllDocs, getDocByKey} from '../../utils/helpers';

const initialState = {
  user: null,
  constitutions: [],
};

const firebaseLogin = createAsyncThunk(
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

const checkSession = createAsyncThunk('user/checkSession', async () => {
  try {
    const userDetails = await getDocByKey(
      'users',
      'email',
      auth.currentUser.email,
    );
    console.log('User details in checksession ', userDetails);
    return userDetails;
  } catch (error) {
    console.log(error.message);
  }
});

const firebaseRegister = createAsyncThunk('user/register', async values => {
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
    return newUser;
  } catch (err) {
    console.error(err);
  }
});

const getAllConstitutions = createAsyncThunk(
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

export const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(firebaseLogin.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(firebaseRegister.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(checkSession.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(getAllConstitutions.fulfilled, (state, action) => {
        state.constitutions = action.payload;
      });
  },
});

export {firebaseLogin, firebaseRegister, checkSession, getAllConstitutions};
export default userSlice.reducer;
