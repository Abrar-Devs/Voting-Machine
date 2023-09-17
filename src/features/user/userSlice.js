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
} from '../../actions/asyncActions';

const initialState = {
  user: null,
  isAdmin: false,
  loading: false,
  constitutions: [],
  candidate: null,
  applications: [],
  elections: [],
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

      .addCase(firebaseRegister.pending, state => {
        state.loading = true;
      })
      .addCase(firebaseRegister.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })

      .addCase(checkSession.fulfilled, (state, action) => {
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
        state.model = {loading: true, message: 'Creating Election'};
      })
      .addCase(createElection.fulfilled, (state, action) => {
        state.model = {
          loading: false,
          message: 'Election Created Successfully',
        };
        state.elections = action.payload;
      })

      .addCase(getAllElections.fulfilled, (state, action) => {
        state.elections = action.payload ?? [];
      })
      .addCase(deleteElection.pending, (state, action) => {
        state.model = {loading: true, message: 'Deleting Election'};
      })
      .addCase(deleteElection.fulfilled, (state, action) => {
        state.elections = action.payload ?? [];
        state.model = {
          loading: false,
          message: 'Election Deleted Successfully',
        };
      });
  },
});

export default userSlice.reducer;
