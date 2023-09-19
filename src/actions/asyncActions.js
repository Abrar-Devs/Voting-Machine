import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  getDocs,
} from 'firebase/firestore';

import {db, auth, storage} from '../config/firebase';
import {
  getAllDocs,
  getDocByKey,
  getDocsByKey,
  uploadImage,
} from '../utils/helpers';

export const initApp = createAsyncThunk('user/initApp', async () => {
  console.log('init app before');
  if (!auth.currentUser) return;
  console.log('init app after');
});

export const firebaseLogin = createAsyncThunk(
  'user/login',
  async ({email, password}) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      let userDetails = await getDocByKey('users', 'email', email);
      userDetails = {...userDetails, id: userCredential.user.uid};
      console.log('User details', userDetails);
      return userDetails;
    } catch (error) {
      console.log(error.message);
      return null;
    }
  },
);

export const firebaseLogout = createAsyncThunk('user/logout', async () => {
  try {
    console.log('siging out....');
    await signOut(auth);
    console.log('signedout....');
  } catch (error) {
    console.log(error.message);
  }
});

export const checkSession = createAsyncThunk('user/checkSession', async () => {
  console.log('before check session', auth);
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

      console.log('in register');
      const downloadURL = await uploadImage(values.profilePic.uri);

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
  },
);

export const getAllConstitutions = createAsyncThunk(
  'user/getAllConstitutions',
  async () => {
    try {
      console.log('in getallconstitions');
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

export const createElection = createAsyncThunk(
  'user/createElection',
  async (electionObj, {getState}) => {
    try {
      const state = getState();
      console.log('in firebase createElection');

      const collectionRef = collection(db, 'elections');

      const newElecRef = await addDoc(collectionRef, electionObj);
      console.log('election added: ', newElecRef.id);

      const newElections = [
        ...state.elections,
        {...electionObj, id: newElecRef.id},
      ];
      return newElections;
    } catch (err) {
      console.error(err);
    }
  },
);

export const getAllElections = createAsyncThunk(
  'user/getAllElections',
  async () => {
    try {
      const elections = await getAllDocs('elections');
      console.log('In get allElections: ', elections);
      const filteredData = elections.map(item => {
        return {
          ...item,
          startDate: item.startDate.toDate(),
          endDate: item.endDate.toDate(),
        };
      });
      return filteredData;
    } catch (error) {
      console.log(error.message);
    }
  },
);

export const deleteElection = createAsyncThunk(
  'user/deleteElection',
  async (id, {getState}) => {
    try {
      const state = getState();
      const electionRef = doc(db, 'elections', id);
      await deleteDoc(electionRef);

      const electionsLeft = state.elections.filter(item => item.id != id);
      return electionsLeft;
    } catch (error) {
      console.log(error.message);
    }
  },
);

export const getConstitutionCandidates = createAsyncThunk(
  'user/getConstitutionCandidates',
  async (_, {getState}) => {
    try {
      console.log('in getConstitutionCandidates ----------');
      const state = getState();

      const collectionRef = collection(db, 'candidates');

      const candidates = await getDocsByKey(
        'candidates',
        'constitution',
        state.user.constitution,
      );
      const filteredData = candidates.filter(c => c.approved == true);
      console.log('getConstitutionCandidates: ', filteredData);
      return filteredData;
    } catch (error) {
      console.log(error.message);
    }
  },
);

export const castVote = createAsyncThunk(
  'user/castVote',
  async ({cid, eid}, {getState}) => {
    try {
      console.log('in castVote ----------');
      const state = getState();

      const collectionRef = collection(db, 'votesCasted');

      console.log('in castvote user is: ', state.user);

      const voteObj = {
        user: state.user.email,
        electionId: eid,
        candidateId: cid,
      };

      const newVoteRef = await addDoc(collectionRef, voteObj);
      console.log('votes casted: ', voteObj);

      const newVoteCasted = [
        ...state.votesCasted,
        {...voteObj, id: newVoteRef.id},
      ];
      return newVoteCasted;
    } catch (error) {
      console.log(error.message);
    }
  },
);

export const getUserVotes = createAsyncThunk(
  'user/getUserVotes',
  async (_, {getState}) => {
    try {
      console.log('in getUserVotes ----------');
      const state = getState();

      const votesCasted = await getDocsByKey(
        'votesCasted',
        'user',
        state.user.email,
      );
      console.log('getvotesCasted result:', votesCasted);
      return votesCasted;
    } catch (error) {
      console.log(error.message);
    }
  },
);

export const getAllCastedVotes = createAsyncThunk(
  'user/getAllVotes',
  async () => {
    try {
      console.log('in getAllVotes ----------');

      const collectionRef = collection(db, 'votesCasted');
      const votesCasted = await getDocs(collectionRef);

      const filteredData = votesCasted.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log('getAllVotes result:', filteredData);
      return filteredData;
    } catch (error) {
      console.log(error.message);
    }
  },
);
