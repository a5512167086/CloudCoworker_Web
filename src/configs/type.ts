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
