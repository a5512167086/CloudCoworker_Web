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

const deleteOrganization = createAsyncThunk(
  'organization/deleteOrganization',
  async (_: void, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const { userToken } = (state as RootState).user;
      const response = await customRequest.post(
        `/api/v1/organization/delete`,
        {},
        {
          headers: { Authorization: `Bearer ${userToken}` },
        },
      );
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response!.data);
      }
    }
  },
);

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

const leaveOrganization = createAsyncThunk(
  'organization/leaveOrganization',
  async (_: void, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const { userToken } = (state as RootState).user;
      const response = await customRequest.post(
        `/api/v1/organization/leave`,
        {},
        {
          headers: { Authorization: `Bearer ${userToken}` },
        },
      );
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response!.data);
      }
    }
  },
);

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
      // eslint-disable-next-line no-use-before-define
      dispatch(initOrganizationState());
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
    organizationOwner: {} as { userEmail: string; userName: string },
    organizationMembers: [] as { userEmail: string; userName: string }[],
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
    initOrganizationState: (state) => {
      state.organizationId = '';
      state.organizationName = '';
      state.organizationOwner = { userEmail: '', userName: '' };
      state.organizationMembers = [];
      state.organizationInviteCode = '';
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
    builder.addCase(joinOrganization.pending, (state) => {
      state.status = Status.Idle;
    });
    builder.addCase(joinOrganization.fulfilled, (state) => {
      state.status = Status.Success;
      state.errorCode = null;
    });
    builder.addCase(joinOrganization.rejected, (state, actions) => {
      const { statusCode } = actions.payload as RejectResponseData;
      state.status = Status.Error;
      state.errorCode = statusCode;
    });
    builder.addCase(deleteOrganization.pending, (state) => {
      state.status = Status.Idle;
    });
    builder.addCase(deleteOrganization.fulfilled, (state) => {
      state.status = Status.Success;
      state.errorCode = null;
    });
    builder.addCase(deleteOrganization.rejected, (state, actions) => {
      const { statusCode } = actions.payload as RejectResponseData;
      state.status = Status.Error;
      state.errorCode = statusCode;
    });
    builder.addCase(leaveOrganization.pending, (state) => {
      state.status = Status.Idle;
    });
    builder.addCase(leaveOrganization.fulfilled, (state) => {
      state.status = Status.Success;
      state.errorCode = null;
    });
    builder.addCase(leaveOrganization.rejected, (state, actions) => {
      const { statusCode } = actions.payload as RejectResponseData;
      state.status = Status.Error;
      state.errorCode = statusCode;
    });
    builder.addCase(getUserOrganization.pending, (state) => {
      state.status = Status.Idle;
    });
    builder.addCase(getUserOrganization.fulfilled, (state, actions) => {
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
  deleteOrganization,
  joinOrganization,
  leaveOrganization,
  getUserOrganization,
};
export const {
  initOrganizationStatus,
  initOrganizationErrorCode,
  initOrganizationState,
} = organizationSlice.actions;
export default organizationSlice.reducer;
