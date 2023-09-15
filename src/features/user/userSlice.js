import {createSlice} from '@reduxjs/toolkit';

import {
  firebaseLogin,
  firebaseRegister,
  checkSession,
  getAllConstitutions,
} from '../../actions/asyncActions';

const initialState = {
  user: null,
  loading: false,
  constitutions: [],
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
      })

      .addCase(firebaseRegister.pending, state => {
        state.loading = true;
      })
      .addCase(firebaseRegister.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      .addCase(checkSession.fulfilled, (state, action) => {
        state.user = action.payload ?? null;
      })
      .addCase(getAllConstitutions.fulfilled, (state, action) => {
        state.constitutions = action.payload;
      });
  },
});

export default userSlice.reducer;
