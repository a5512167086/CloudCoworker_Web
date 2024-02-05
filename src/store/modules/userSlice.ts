import { customRequest } from '@configs/api';
import { LoginFormData, RejectResponseData, Status } from '@configs/type';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';

const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async (userInfo: LoginFormData, { rejectWithValue }) => {
    const user = {
      email: userInfo.email.value,
      password: userInfo.password.value,
    };
    try {
      const response = await customRequest.post(`/api/v1/users/login`, user);

      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response!.data);
      }
    }
  },
);

const registerUser = createAsyncThunk(
  'user/registerUser',
  async (userInfo: LoginFormData, { rejectWithValue }) => {
    const user = {
      username: userInfo.username.value,
      email: userInfo.email.value,
      password: userInfo.password.value,
    };
    try {
      const response = await customRequest.post(`/api/v1/users/register`, user);

      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response!.data);
      }
    }
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userName: '',
    userEmail: '',
    userToken: null as string | null,
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
    builder.addCase(fetchUserData.fulfilled, (state, actions) => {
      const { userName, userEmail, token } = actions.payload;
      state.userName = userName;
      state.userEmail = userEmail;
      state.userToken = token;
      state.status = Status.Success;
      state.errorCode = null;
    });
    builder.addCase(fetchUserData.rejected, (state, actions) => {
      const { statusCode } = actions.payload as RejectResponseData;
      state.status = Status.Error;
      state.errorCode = statusCode;
    });
    builder.addCase(registerUser.pending, (state) => {
      state.status = Status.Idle;
    });
    builder.addCase(registerUser.fulfilled, (state) => {
      state.status = Status.Success;
    });
    builder.addCase(registerUser.rejected, (state, actions) => {
      const { statusCode } = actions.payload as RejectResponseData;
      state.status = Status.Error;
      state.errorCode = statusCode;
    });
  },
});

export { fetchUserData, registerUser };
export const { initUserStatus, initUserErrorCode } = userSlice.actions;
export default userSlice.reducer;
