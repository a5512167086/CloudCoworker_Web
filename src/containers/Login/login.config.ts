export enum LoginFlow {
  Login = 'Login',
  Register = 'Register',
}

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
