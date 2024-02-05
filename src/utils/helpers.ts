import { LOGIN_FORM_KEYS } from '@configs/common';
import { Status } from '@configs/type';

export const isEmpty = (val: unknown) =>
  val === undefined ||
  val === null ||
  (Array.isArray(val) && val.length === 0) ||
  (typeof val === 'object' && Object.keys(val).length === 0) ||
  (typeof val === 'string' && val.trim().length === 0);

const isEmailFormatValid = (val: string) => {
  const emailRegex = /[a-z0-9]+@[a-z]+.[a-z]{2,3}/g;

  return emailRegex.test(val);
};

export const validateLoginForm = (key: string, value: string | number) => {
  if (isEmpty(value)) {
    return { status: Status.Error, errorText: 'form.empty_error_text' };
  }

  if (key === LOGIN_FORM_KEYS.EMAIL && !isEmailFormatValid(value as string)) {
    return { status: Status.Error, errorText: 'form.email_invalid_text' };
  }

  return { status: Status.Success, errorText: '' };
};

export const checkIsAuth = (
  userName: string,
  userEmail: string,
  userToken: string,
) => userName && userEmail && userToken;
