import { Alert } from 'react-native'
import { launchImageLibrary } from 'react-native-image-picker'
import { getDocs, collection, query, where } from 'firebase/firestore'
import { getStorage, ref, getDownloadURL, uploadBytes } from 'firebase/storage'

import { db } from '../config/firebase'

const storage = getStorage()

export const openImagePicker = async () => {
  const options = {
    mediaType: 'photo',
    includeBase64: false,
    maxHeight: 2000,
    maxWidth: 2000,
  }

  return new Promise((resolve, reject) => {
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        resolve(null)
      } else if (response.error) {
        reject(response.error)
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri
        resolve({ uri: imageUri })
      }
    })
  })
}

export const uploadImage = async image => {
  if (!image) return null

  const fileBlob = await getBlobFroUri(image)
  const imgName = 'img-' + new Date().getTime()
  const storageRef = ref(storage, `images/${imgName}.jpg`)

  const snapshot = await uploadBytes(storageRef, fileBlob)
  return getDownloadURL(snapshot.ref)
}

const getBlobFroUri = uri => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.onload = function () {
      resolve(xhr.response)
    }
    xhr.onerror = function (e) {
      reject(new TypeError('Network request failed'))
    }
    xhr.responseType = 'blob'
    xhr.open('GET', uri, true)
    xhr.send(null)
  })
}

export const getAllDocs = async collectionName => {
  try {
    const collectionRef = collection(db, collectionName)
    const data = await getDocs(collectionRef)
    const filteredData = data.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
    }))
    return filteredData
  } catch (error) {}
}

export const getDocByKey = async (collectionName, key, value) => {
  try {
    const collectionRef = collection(db, collectionName)
    const q = query(collectionRef, where(key, '==', value))
    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      return null
    }

    const result = querySnapshot.docs[0]
    return result.data()
  } catch (error) {}
}

export const getDocsByKey = async (collectionName, key, value) => {
  try {
    const collectionRef = collection(db, collectionName)
    const q = query(collectionRef, where(key, '==', value))
    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      return null
    }

    const filteredData = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
    }))
    return filteredData
  } catch (error) {}
}

export const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

export const timeFormatter = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
})

export const getOngoingElections = electionsArray => {
  const currentDate = new Date()
  const result = electionsArray.filter(
    election => currentDate >= election.startDate && currentDate <= election.endDate
  )
  return result
}

export const getEndedElections = electionsArray => {
  const currentDate = new Date()
  return electionsArray.filter(election => currentDate > election.endDate)
}

export const getFutureElections = electionsArray => {
  const currentDate = new Date()
  return electionsArray.filter(election => currentDate < election.startDate)
}

export const confirmationBox = async () => {
  return new Promise(resolve => {
    Alert.alert('Confirmation', 'Are you sure you want to proceed', [
      {
        text: 'Cancel',
        onPress: () => resolve(false),
      },
      {
        text: 'Confirm',
        onPress: () => resolve(true),
      },
    ])
  })
}

export const showAlert = msg => {
  Alert.alert(
    'Alert',
    msg,
    [
      {
        text: 'OK',
        onPress: () => {},
      },
    ],
    { cancelable: true }
  )
}

export const getVoteCount = (votesCasted, electionId, candidateList) => {
  const electionVotes = votesCasted.filter(vote => vote.electionId === electionId)

  const voteCount = {}

  electionVotes.forEach(vote => {
    const { candidateId } = vote

    const matchingCandidate = candidateList.find(candidate => candidate.id === candidateId)

    if (matchingCandidate) {
      const { id, user } = matchingCandidate
      voteCount[id] = { id, user, count: (voteCount[id]?.count || 0) + 1 }
    }
  })

  return voteCount
}
