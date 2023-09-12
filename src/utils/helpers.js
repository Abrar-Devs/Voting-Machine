import {launchImageLibrary} from 'react-native-image-picker';
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
