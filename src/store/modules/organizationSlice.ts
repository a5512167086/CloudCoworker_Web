import { customRequest } from '@configs/api';
import { RejectResponseData, Status } from '@configs/type';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import { RootState } from '..';
import { setUserOrganization } from './userSlice';

const createOrganization = createAsyncThunk(
  'organization/createOrganization',
  async (organizationName: string, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const { userToken } = (state as RootState).user;
      const response = await customRequest.post(
        `/api/v1/organization`,
        { organizationName },
        { headers: { Authorization: `Bearer ${userToken}` } },
      );
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response!.data);
      }
    }
  },
);

// const deleteOrganization = createAsyncThunk(
//   'organization/createOrganization',
//   async (token, { rejectWithValue }) => {},
// );

const joinOrganization = createAsyncThunk(
  'organization/joinOrganization',
  async (inviteCode: string, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const { userToken } = (state as RootState).user;
      const response = await customRequest.post(
        `/api/v1/organization/join`,
        { inviteCode },
        { headers: { Authorization: `Bearer ${userToken}` } },
      );
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response!.data);
      }
    }
  },
);

// const leaveOrganization = createAsyncThunk(
//   'organization/createOrganization',
//   async (token, { rejectWithValue }) => {},
// );

const getUserOrganization = createAsyncThunk(
  'organization/getUserOrganization',
  async (_: void, { dispatch, getState, rejectWithValue }) => {
    try {
      const state = getState();
      const { userToken } = (state as RootState).user;
      const response = await customRequest.get(
        `/api/v1/users/getOrganization`,
        { headers: { Authorization: `Bearer ${userToken}` } },
      );
      const { organizationId, isOwner } = response.data;
      dispatch(setUserOrganization({ organizationId, isOwner }));
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response!.data);
      }
    }
  },
);

export const organizationSlice = createSlice({
  name: 'organization',
  initialState: {
    organizationId: '',
    organizationName: '',
    organizationOwner: '',
    organizationMembers: [],
    organizationInviteCode: '',
    status: 'idle',
    errorCode: null as number | null,
  },
  reducers: {
    initOrganizationStatus: (state) => {
      state.status = Status.Idle;
    },
    initOrganizationErrorCode: (state) => {
      state.errorCode = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createOrganization.pending, (state) => {
      state.status = Status.Idle;
    });
    builder.addCase(createOrganization.fulfilled, (state) => {
      state.status = Status.Success;
      state.errorCode = null;
    });
    builder.addCase(createOrganization.rejected, (state, actions) => {
      const { statusCode } = actions.payload as RejectResponseData;
      state.status = Status.Error;
      state.errorCode = statusCode;
    });
    builder.addCase(getUserOrganization.pending, (state) => {
      state.status = Status.Idle;
    });
    builder.addCase(getUserOrganization.fulfilled, (state, actions) => {
      console.log('test');
      console.log(actions.payload);
      const {
        organizationId,
        organizationMembers,
        organizationName,
        organizationOwner,
        organizationInviteCode,
      } = actions.payload;

      state.organizationId = organizationId;
      state.organizationName = organizationName;
      state.organizationOwner = organizationOwner;
      state.organizationMembers = organizationMembers;
      state.organizationInviteCode = organizationInviteCode;
      state.status = Status.Success;
      state.errorCode = null;
    });
    builder.addCase(getUserOrganization.rejected, (state, actions) => {
      const { statusCode } = actions.payload as RejectResponseData;
      state.status = Status.Error;
      state.errorCode = statusCode;
    });
  },
});

export {
  createOrganization,
  // deleteOrganization,
  joinOrganization,
  // leaveOrganization,
  getUserOrganization,
};
export const { initOrganizationStatus, initOrganizationErrorCode } =
  organizationSlice.actions;
export default organizationSlice.reducer;
