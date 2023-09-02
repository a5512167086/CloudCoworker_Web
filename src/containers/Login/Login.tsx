import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { LoginFlow, getLoginTitleText } from './login.config';
import { PAGE_PATHS } from '@routes/index';
import { isEmpty, validateLoginForm } from '@utils/helpers';
import { LoginFormData, Status } from '@configs/type';
import { StyledLogin } from './login.style';
import { CustomLink } from '@components/CustomLink';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
} from '@mui/material';
import { LOGIN_FORM_KEYS } from '@configs/common';

const initLoginFormState: LoginFormData = {
  username: { value: '', status: Status.Idle, errorText: '' },
  email: { value: '', status: Status.Idle, errorText: '' },
  password: { value: '', status: Status.Idle, errorText: '' },
};

export const Login = () => {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const [currentFlow, setCurrentFlow] = useState<LoginFlow | null>(null);
  const [formData, setFormData] = useState<LoginFormData>(initLoginFormState);
  const [isRemeberMe, setIsRemeberMe] = useState(false);

  const initLoginFormData = () => {
    setFormData({ ...initLoginFormState });
  };

  useEffect(() => {
    if (pathname === PAGE_PATHS.REGISTER) {
      setCurrentFlow(LoginFlow.Register);
    }
    if (pathname === PAGE_PATHS.LOGIN) {
      setCurrentFlow(LoginFlow.Login);
    }
    initLoginFormData();
  }, [pathname]);

  const handleLoginFormChange = (
    event: ChangeEvent<HTMLInputElement>,
    key: keyof LoginFormData,
  ) => {
    setFormData((prev) => {
      const currentFormData = prev;
      currentFormData[key].value = event.target.value;
      return { ...currentFormData };
    });
  };

  const handleCheckRememberMe = () => {
    setIsRemeberMe((prev) => !prev);
  };

  const handleLoginFormBlur = (key: keyof LoginFormData) => {
    const { status, errorText } = validateLoginForm(key, formData[key].value);
    setFormData((prev) => {
      const currentFormData = prev;
      currentFormData[key] = {
        ...currentFormData[key],
        status,
        errorText,
      };

      return { ...currentFormData };
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    Object.keys(LOGIN_FORM_KEYS).forEach((key: string) => {
      const keyValue = LOGIN_FORM_KEYS[key];
      handleLoginFormBlur(keyValue as keyof LoginFormData);
    });
  };

  if (isEmpty(currentFlow)) {
    return null;
  }

  return (
    <StyledLogin component='main' maxWidth='xs'>
      <Box className='login_container'>
        <Typography component='h1' variant='h5'>
          {t(getLoginTitleText(currentFlow!))}
        </Typography>
        <Box
          component='form'
          onSubmit={handleSubmit}
          noValidate
          className='login_formContainer'>
          {currentFlow === LoginFlow.Register && (
            <TextField
              margin='normal'
              required
              fullWidth
              error={formData.username.status === Status.Error}
              helperText={t(formData.username.errorText, {
                key: t('form.username'),
              })}
              name={LOGIN_FORM_KEYS.USER_NAME}
              label={t('form.username')}
              type='text'
              id={LOGIN_FORM_KEYS.USER_NAME}
              value={formData.username.value}
              autoComplete={LOGIN_FORM_KEYS.USER_NAME}
              onChange={(event) => {
                handleLoginFormChange(
                  event as ChangeEvent<HTMLInputElement>,
                  LOGIN_FORM_KEYS.USER_NAME as keyof LoginFormData,
                );
              }}
              onBlur={() => {
                handleLoginFormBlur(
                  LOGIN_FORM_KEYS.USER_NAME as keyof LoginFormData,
                );
              }}
            />
          )}
          <TextField
            margin='normal'
            required
            fullWidth
            error={formData.email.status === Status.Error}
            helperText={t(formData.email.errorText, {
              key: t('form.email'),
            })}
            id={LOGIN_FORM_KEYS.EMAIL}
            value={formData.email.value}
            label={t('form.email')}
            type='email'
            name={LOGIN_FORM_KEYS.EMAIL}
            autoComplete={LOGIN_FORM_KEYS.EMAIL}
            onChange={(event) => {
              handleLoginFormChange(
                event as ChangeEvent<HTMLInputElement>,
                LOGIN_FORM_KEYS.EMAIL as keyof LoginFormData,
              );
            }}
            onBlur={() => {
              handleLoginFormBlur(LOGIN_FORM_KEYS.EMAIL as keyof LoginFormData);
            }}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            error={formData.password.status === Status.Error}
            helperText={t(formData.password.errorText, {
              key: t('form.password'),
            })}
            name={LOGIN_FORM_KEYS.PASSWORD}
            label={t('form.password')}
            type='password'
            id={LOGIN_FORM_KEYS.PASSWORD}
            value={formData.password.value}
            autoComplete={LOGIN_FORM_KEYS.PASSWORD}
            onChange={(event) => {
              handleLoginFormChange(
                event as ChangeEvent<HTMLInputElement>,
                LOGIN_FORM_KEYS.PASSWORD as keyof LoginFormData,
              );
            }}
            onBlur={() => {
              handleLoginFormBlur(
                LOGIN_FORM_KEYS.PASSWORD as keyof LoginFormData,
              );
            }}
          />
          {currentFlow === LoginFlow.Login && (
            <FormControlLabel
              control={
                <Checkbox
                  checked={isRemeberMe}
                  onChange={handleCheckRememberMe}
                  color='primary'
                />
              }
              label='Remember me'
            />
          )}
          <Button
            type='submit'
            fullWidth
            variant='contained'
            className='login_formButton'>
            {t(getLoginTitleText(currentFlow!))}
          </Button>
          <Grid container>
            <Grid item xs>
              {currentFlow === LoginFlow.Login && (
                <CustomLink variant='body2' to={PAGE_PATHS.FORGOT_PASSWORD}>
                  {t('login.forgot_password')}
                </CustomLink>
              )}
            </Grid>
            <Grid item>
              {currentFlow === LoginFlow.Login ? (
                <CustomLink variant='body2' to={PAGE_PATHS.REGISTER}>
                  {t('login.without_account_description')}
                </CustomLink>
              ) : (
                <CustomLink variant='body2' to={PAGE_PATHS.LOGIN}>
                  {t('register.with_account_description')}
                </CustomLink>
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </StyledLogin>
  );
};
