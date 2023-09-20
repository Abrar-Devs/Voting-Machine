import { createAsyncThunk } from '@reduxjs/toolkit'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth'
import { collection, addDoc, updateDoc, doc, deleteDoc, getDocs } from 'firebase/firestore'

import { db, auth } from '../config/firebase'
import { getAllDocs, getDocByKey, getDocsByKey, uploadImage } from '../utils/helpers'

export const initApp = createAsyncThunk('user/initApp', async () => {
  if (!auth.currentUser) return
})

export const firebaseLogin = createAsyncThunk('user/login', async ({ email, password }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)

    let userDetails = await getDocByKey('users', 'email', email)

    return { ...userDetails, id: userCredential.user.uid }
  } catch (error) {
    console.log(error)
    return null
  }
})

export const firebaseLogout = createAsyncThunk('user/logout', async () => {
  try {
    await signOut(auth)
  } catch (error) {
    console.log(error)
  }
})

export const checkSession = createAsyncThunk('user/checkSession', async () => {
  if (!auth.currentUser) return
  try {
    const userDetails = await getDocByKey('users', 'email', auth.currentUser?.email)
    return userDetails
  } catch (error) {
    console.log(error)
  }
})

export const firebaseRegister = createAsyncThunk('user/register', async values => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password)
    const user = userCredential.user

    const downloadURL = await uploadImage(values.profilePic.uri)

    const usersCollectionRef = collection(db, 'users')
    await addDoc(usersCollectionRef, { ...values, profilePic: downloadURL })

    const newUser = { ...values, profilePic: downloadURL }
    return newUser
  } catch (err) {
    console.log(error)
    return null
  }
})

export const getAllConstitutions = createAsyncThunk('user/getAllConstitutions', async () => {
  try {
    const constitutions = await getAllDocs('constitutions')
    return constitutions
  } catch (error) {
    console.log(error)
  }
})

export const submitCandidateApplication = createAsyncThunk(
  'user/candidateApplication',
  async values => {
    try {
      const downloadURL = await uploadImage(values.partySymbol.uri)

      const usersCollectionRef = collection(db, 'candidates')

      const applicationObj = { ...values, partySymbol: downloadURL }
      await addDoc(usersCollectionRef, applicationObj)

      return applicationObj
    } catch (err) {
      console.log(error)
    }
  }
)

export const getCandidateApplications = createAsyncThunk(
  'user/getCandidateApplications',
  async () => {
    try {
      const applications = await getDocsByKey('candidates', 'approved', false)
      return applications
    } catch (error) {
      console.log(error)
    }
  }
)

export const approveCandidateApplication = createAsyncThunk(
  'user/approveCandidateApplication',
  async (id, { getState }) => {
    try {
      const state = getState()

      const applicationsLeft = state.applications.filter(item => item.id != id)

      const applicationRef = doc(db, 'candidates', id)
      await updateDoc(applicationRef, { approved: true })
      return applicationsLeft
    } catch (error) {
      console.log(error)
    }
  }
)

export const getCandidateProfile = createAsyncThunk('user/getCandidateProfile', async () => {
  try {
    const candidProfile = await getDocByKey('candidates', 'user', auth.currentUser.email)
    return candidProfile
  } catch (error) {
    console.log(error)
  }
})

export const createElection = createAsyncThunk(
  'user/createElection',
  async (electionObj, { getState }) => {
    try {
      const state = getState()

      const collectionRef = collection(db, 'elections')

      const newElecRef = await addDoc(collectionRef, electionObj)

      const newElections = [...state.elections, { ...electionObj, id: newElecRef.id }]
      return newElections
    } catch (err) {
      console.log(error)
    }
  }
)

export const getAllElections = createAsyncThunk('user/getAllElections', async () => {
  try {
    const elections = await getAllDocs('elections')
    const filteredData = elections.map(item => {
      return {
        ...item,
        startDate: item.startDate.toDate(),
        endDate: item.endDate.toDate(),
      }
    })
    return filteredData
  } catch (error) {
    console.log(error)
  }
})

export const deleteElection = createAsyncThunk('user/deleteElection', async (id, { getState }) => {
  try {
    const state = getState()
    const electionRef = doc(db, 'elections', id)
    await deleteDoc(electionRef)

    const electionsLeft = state.elections.filter(item => item.id != id)
    return electionsLeft
  } catch (error) {
    console.log(error)
  }
})

export const getConstitutionCandidates = createAsyncThunk(
  'user/getConstitutionCandidates',
  async (_, { getState }) => {
    try {
      const state = getState()

      const collectionRef = collection(db, 'candidates')

      const candidates = await getDocsByKey('candidates', 'constitution', state.user.constitution)
      const filteredData = candidates.filter(c => c.approved == true)
      return filteredData
    } catch (error) {
      console.log(error)
    }
  }
)

export const castVote = createAsyncThunk('user/castVote', async ({ cid, eid }, { getState }) => {
  try {
    const state = getState()

    const collectionRef = collection(db, 'votesCasted')

    const voteObj = {
      user: state.user.email,
      electionId: eid,
      candidateId: cid,
    }

    const newVoteRef = await addDoc(collectionRef, voteObj)

    const newVoteCasted = [...state.votesCasted, { ...voteObj, id: newVoteRef.id }]
    return newVoteCasted
  } catch (error) {
    console.log(error)
  }
})

export const getUserVotes = createAsyncThunk('user/getUserVotes', async (_, { getState }) => {
  try {
    const state = getState()

    const votesCasted = await getDocsByKey('votesCasted', 'user', state.user.email)
    return votesCasted
  } catch (error) {
    console.log(error)
  }
})

export const getAllCastedVotes = createAsyncThunk('user/getAllVotes', async () => {
  try {
    const collectionRef = collection(db, 'votesCasted')
    const votesCasted = await getDocs(collectionRef)

    const filteredData = votesCasted.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
    }))
    return filteredData
  } catch (error) {
    console.log(error)
  }
})
