export enum Status {
  Idle = 'Idle',
  Success = 'Success',
  Error = 'Error',
}

export type LoginFormData = {
  username: { value: string; status: Status; errorText: string };
  email: { value: string; status: Status; errorText: string };
  password: { value: string; status: Status; errorText: string };
};

export type LoginFormDataWithRemember = {
  username: { value: string; status: Status; errorText: string };
  email: { value: string; status: Status; errorText: string };
  password: { value: string; status: Status; errorText: string };
  isRemeberMe: boolean;
};

export type ManageFormData = {
  organizationName?: { value: string; status: Status; errorText: string };
  inviteCode?: { value: string; status: Status; errorText: string };
};

export type RejectResponseData = {
  statusCode: number;
};
