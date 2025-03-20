import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../axiosInstance';
import { Inputs } from '../types';
import { InitialState } from './appSlice';

const userSignup = createAsyncThunk('user/signup', async (data: Inputs) => {
  try {
    const response = await axiosInstance.post<InitialState['user']>(
      `${import.meta.env.VITE_API}/auth/signup`,
      data
    );
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
});

const userSignin = createAsyncThunk('user/signin', async (data: Inputs) => {
  try {
    const response = await axiosInstance.post<InitialState['user']>(
      `${import.meta.env.VITE_API}/auth/signin`,
      data
    );
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
});

const userRefresh = createAsyncThunk('user/refresh', async () => {
  const response = await axiosInstance.get<InitialState['user']>(
    `${import.meta.env.VITE_API}/token/refresh`
  );
  return response.data;
});

const userLogout = createAsyncThunk('user/logout', async () => {
  await axiosInstance.get(`${import.meta.env.VITE_API}/auth/logout`);
});


const userUpdate = createAsyncThunk(
  "user/update",
  async (data: Inputs, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch<InitialState["user"]>(
        `${import.meta.env.VITE_API}/auth`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Ошибка обновления данных");
    }
  }
);



export { userSignup, userSignin, userRefresh, userLogout,userUpdate };
