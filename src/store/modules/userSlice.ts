import { customRequest } from '@configs/api';
import {
  LoginFormData,
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

const checkUserLogin = createAsyncThunk(
  'user/checkUserLogin',
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await customRequest.get(`/api/v1/users/checkLogin`, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
    initUserState: (state) => {
      state.userName = '';
      state.userEmail = '';
      state.userToken = null;
      state.userName = '';
      state.status = Status.Idle;
      state.errorCode = null;
      sessionStorage.removeItem('userToken');
      localStorage.removeItem('userToken');
    },
    setUser: (state, actions) => {
      const { userEmail, userName } = actions.payload;
      state.userEmail = userEmail;
      state.userName = userName;
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
    builder.addCase(checkUserLogin.fulfilled, (state, actions) => {
      const { userEmail, userName, token } = actions.payload;
      state.userEmail = userEmail;
      state.userName = userName;
      state.userToken = token;
    });
    builder.addCase(checkUserLogin.rejected, (state) => {
      state.userEmail = '';
      state.userName = '';
      state.userToken = '';
    });
  },
});

export { fetchUserData, registerUser, checkUserLogin };
export const { initUserStatus, initUserErrorCode, initUserState } =
  userSlice.actions;
export default userSlice.reducer;
