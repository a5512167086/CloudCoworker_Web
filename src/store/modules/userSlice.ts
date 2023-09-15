import { customRequest } from '@configs/api';
import { LoginFormData, Status } from '@configs/type';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async (userInfo: LoginFormData) => {
    const user = {
      email: userInfo.email.value,
      password: userInfo.password.value,
    };
    const response = await customRequest.post(`/api/v1/users/login`, user);
    console.log(response.data);
    return response.data;
  },
);

const registerUser = createAsyncThunk(
  'user/registerUser',
  async (userInfo: LoginFormData) => {
    const user = {
      username: userInfo.username.value,
      email: userInfo.email.value,
      password: userInfo.password.value,
    };
    const response = await customRequest.post(`/api/v1/users/register`, user);
    return response.data;
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userName: '',
    userEmail: '',
    userToken: null,
    userWorkspace: '',
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.pending, (state) => {
      state.status = Status.Idle;
    });
    builder.addCase(fetchUserData.fulfilled, (state) => {
      state.status = Status.Success;
    });
    builder.addCase(fetchUserData.rejected, (state) => {
      state.status = Status.Error;
    });
  },
});

export { fetchUserData, registerUser };
export default userSlice.reducer;
