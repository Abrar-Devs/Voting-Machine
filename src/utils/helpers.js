import {launchImageLibrary} from 'react-native-image-picker';
import {db, auth} from '../config/firebase';
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  query,
  where,
} from 'firebase/firestore';

export const openImagePicker = async () => {
  const options = {
    mediaType: 'photo',
    includeBase64: false,
    maxHeight: 2000,
    maxWidth: 2000,
  };

  return new Promise((resolve, reject) => {
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
        resolve(null);
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
        reject(response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        resolve({uri: imageUri});
      }
    });
  });
};

export const getAllDocs = async collectionName => {
  try {
    const collectionRef = collection(db, collectionName);
    const data = await getDocs(collectionRef);
    const filteredData = data.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
    }));
    return filteredData;
  } catch (error) {}
};

export const getDoc = async (collectionName, key, value) => {
  try {
    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef, where(key, '==', value));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log('did not find anything..');
      return null;
    }

    const result = querySnapshot.docs[0];
    return result.data();
  } catch (error) {
    console.log('in getDoc', error);
  }
};
