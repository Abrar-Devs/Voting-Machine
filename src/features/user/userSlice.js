import {createSlice} from '@reduxjs/toolkit';

import {
  firebaseLogin,
  firebaseRegister,
  checkSession,
  getAllConstitutions,
  submitCandidateApplication,
  getCandidateApplications,
  getCandidateProfile,
  approveCandidateApplication,
  createElection,
  getAllElections,
  deleteElection,
  getConstitutionCandidates,
  castVote,
  getUserVotes,
  firebaseLogout,
} from '../../actions/asyncActions';

const initialState = {
  user: null,
  isAdmin: false,
  loading: true,
  constitutions: [],
  candidate: null,
  applications: [],
  elections: [],
  constitutionCandidates: [],
  votesCasted: [],
  model: {
    loading: false,
    message: '',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(firebaseLogin.pending, state => {
        state.loading = true;
      })
      .addCase(firebaseLogin.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        if (state.user.email == 'admin@gmail.com') state.isAdmin = true;
      })
      .addCase(firebaseLogin.rejected, (state, action) => {
        state.user = null;
        state.loading = false;
      })

      .addCase(firebaseRegister.pending, state => {
        state.loading = true;
      })
      .addCase(firebaseRegister.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })

      .addCase(checkSession.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload ?? null;
        if (state.user?.email == 'admin@gmail.com') state.isAdmin = true;
      })

      .addCase(getAllConstitutions.fulfilled, (state, action) => {
        state.constitutions = action.payload;
      })

      .addCase(getCandidateProfile.fulfilled, (state, action) => {
        state.candidate = action.payload;
      })

      .addCase(submitCandidateApplication.fulfilled, (state, action) => {
        state.candidate = action.payload;
      })
      .addCase(getCandidateApplications.fulfilled, (state, action) => {
        state.applications = action.payload ?? [];
      })
      .addCase(approveCandidateApplication.fulfilled, (state, action) => {
        state.applications = action.payload ?? [];
      })

      .addCase(createElection.pending, (state, action) => {
        state.model = setModel(true, 'Creating Election');
      })
      .addCase(createElection.fulfilled, (state, action) => {
        state.model = setModel();
        state.elections = action.payload;
      })

      //polling
      .addCase(getConstitutionCandidates.fulfilled, (state, action) => {
        state.constitutionCandidates = action.payload ?? [];
      })

      .addCase(getAllElections.fulfilled, (state, action) => {
        state.elections = action.payload ?? [];
      })
      .addCase(deleteElection.pending, (state, action) => {
        state.model = setModel(true, 'Deleting Election');
      })
      .addCase(deleteElection.fulfilled, (state, action) => {
        state.elections = action.payload ?? [];
        state.model = setModel();
      })

      .addCase(castVote.pending, (state, action) => {
        state.model = setModel(true, 'Casting Vote');
      })
      .addCase(castVote.fulfilled, (state, action) => {
        state.model = setModel();
        state.votesCasted = action.payload ?? [];
      })

      .addCase(getUserVotes.pending, (state, action) => {
        state.model = setModel(true, 'Loading elections data....');
      })
      .addCase(getUserVotes.fulfilled, (state, action) => {
        state.model = setModel();
        state.votesCasted = action.payload ?? [];
      })

      //logout
      .addCase(firebaseLogout.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(firebaseLogout.fulfilled, (state, action) => {
        state.user = null;
        state.isAdmin = false;
        state.loading = false;
        state.constitutions = [];
        state.candidate = null;
        state.applications = [];
        state.elections = [];
        state.constitutionCandidates = [];
        state.votesCasted = [];
        state.model = {
          loading: false,
          message: '',
        };
      });
  },
});

const setModel = (loading = false, message = '') => ({
  loading,
  message,
});

export default userSlice.reducer;
