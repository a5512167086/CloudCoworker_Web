export enum LoginFlow {
  Login = 'Login',
  Register = 'Register',
}

export const LoginStatusCode = {
  4001: 'Login form has empty fields',
  4002: 'Password uncorrect or Account unexisting',
  4003: 'Register form has empty fields',
  4044: 'Email has already been used',
};

export const getLoginTitleText = (currentFlow: LoginFlow): string => {
  if (currentFlow === LoginFlow.Login) {
    return 'login.title';
  }
  if (currentFlow === LoginFlow.Register) {
    return 'register.title';
  }

  return '';
};

export const getLoginButtonText = (currentFlow: LoginFlow): string => {
  if (currentFlow === LoginFlow.Login) {
    return 'login.login_button';
  }
  if (currentFlow === LoginFlow.Register) {
    return 'register.login_button';
  }

  return '';
};
