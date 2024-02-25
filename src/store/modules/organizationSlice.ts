import { customRequest } from '@configs/api';
import {
  LoginFormDataWithRemember,
  RejectResponseData,
  Status,
} from '@configs/type';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';

const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async (userInfo: LoginFormDataWithRemember, { rejectWithValue }) => {
    const user = {
      email: userInfo.email.value,
      password: userInfo.password.value,
    };
    try {
      const response = await customRequest.post(`/api/v1/users/login`, user);
      if (userInfo.isRemeberMe) {
        localStorage.setItem('userToken', response.data.token);
      } else {
        sessionStorage.setItem('userToken', response.data.token);
      }
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response!.data);
      }
    }
  },
);

export const organizationSlice = createSlice({
  name: 'user',
  initialState: {
    status: 'idle',
    errorCode: null as number | null,
  },
  reducers: {
    initUserStatus: (state) => {
      state.status = Status.Idle;
    },
    initUserErrorCode: (state) => {
      state.errorCode = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.pending, (state) => {
      state.status = Status.Idle;
    });
    builder.addCase(fetchUserData.fulfilled, (state) => {
      state.status = Status.Success;
      state.errorCode = null;
    });
    builder.addCase(fetchUserData.rejected, (state, actions) => {
      const { statusCode } = actions.payload as RejectResponseData;
      state.status = Status.Error;
      state.errorCode = statusCode;
    });
  },
});

export { fetchUserData };
export const { initUserStatus, initUserErrorCode } = organizationSlice.actions;
export default organizationSlice.reducer;
