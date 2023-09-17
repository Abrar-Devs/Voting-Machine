import {configureStore} from '@reduxjs/toolkit';

import userReducer from '../features/user/userSlice';
import {getAllElections} from '../actions/asyncActions';

export const store = configureStore({
  reducer: userReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
