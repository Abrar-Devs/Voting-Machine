import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDGvXDi8VlPRXXiWCpfNde9-YzypZiTeNQ',
  authDomain: 'votingmachine-6e12f.firebaseapp.com',
  projectId: 'votingmachine-6e12f',
  storageBucket: 'votingmachine-6e12f.appspot.com',
  messagingSenderId: '837247081062',
  appId: '1:837247081062:web:5904a97f9973db76842ba7',
  measurementId: 'G-QL87HL6Q6H',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
