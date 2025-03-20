import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types';
import {
  userLogout,
  userRefresh,
  userSignin,
  userSignup,
  userUpdate,
} from "./thunkActions";
import { setAccessToken } from "../axiosInstance";

export type InitialState = {
  user: {
    user: User;
    accessToken: string;
    isAuth: boolean;
    // isInitialLoading: boolean;
  };
  errorResponse: string;
};

const initialState: InitialState = {
  user: {
    user: {
      id: 0,
      username: '',
      email: '',
      isCompany: false,
    },
    accessToken: '',
    isAuth: false,
    // isInitialLoading: true,
  },
  errorResponse: '',
};

const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userSignup.fulfilled, (state, action) => {
      if (action.payload.user) {
        state.user = action.payload;
        state.user.isAuth = true;
        setAccessToken(action.payload.accessToken);
      } else {
        state.errorResponse = action.payload;
      }
    });
    builder.addCase(userSignin.fulfilled, (state, action) => {
      if (action.payload.user) {
        state.user = action.payload;
        state.user.isAuth = true;
        setAccessToken(action.payload.accessToken);
      } else {
        state.errorResponse = action.payload;
      }
    });
    // builder.addCase(userRefresh.rejected, (state, action) => {
    //   state.user.isInitialLoading = false;
    // });
    builder.addCase(userRefresh.fulfilled, (state, action) => {
      state.user = action.payload;
      state.user.isAuth = true;
      // state.user.isInitialLoading = false;
      setAccessToken(action.payload.accessToken);
    });
    builder.addCase(userLogout.fulfilled, (state) => {
      setAccessToken('');
      state.user = {
        user: {
          id: 0,
          username: '',
          email: '',
          isCompany: false,
        },
        accessToken: '',
        isAuth: false,
        // isInitialLoading: false,
      };
    });
    //для редактирования пользователя:
    builder.addCase(userUpdate.fulfilled, (state, action) => {
      if (action.payload.user) {
      state.user = action.payload
      console.log(action.payload.user);
      } else {
      state.errorResponse = action.payload;
      }
    });
  },
});

export default appSlice.reducer;
export const {} = appSlice.actions;
