import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { LoginFlow, getLoginTitleText } from './login.config';
import { PAGE_PATHS } from '@routes/index';
import { isEmpty } from '@utils/helpers';
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

export const Login = () => {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const [currentFlow, setCurrentFlow] = useState<LoginFlow | null>(null);
  const [formData, setFormData] = useState<LoginFormData>({
    username: { value: '', status: Status.Idle, errorText: '' },
    email: { value: '', status: Status.Idle, errorText: '' },
    password: { value: '', status: Status.Idle, errorText: '' },
  });
  const [isRemeberMe, setIsRemeberMe] = useState(false);

  useEffect(() => {
    if (pathname === PAGE_PATHS.REGISTER) {
      setCurrentFlow(LoginFlow.Register);
    }
    if (pathname === PAGE_PATHS.LOGIN) {
      setCurrentFlow(LoginFlow.Login);
    }
  }, [pathname]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

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
              name='username'
              label={t('form.username')}
              onChange={(event) => {
                handleLoginFormChange(
                  event as ChangeEvent<HTMLInputElement>,
                  'username',
                );
              }}
              type='text'
              id='username'
              value={formData.username.value}
              autoComplete='username'
            />
          )}
          <TextField
            margin='normal'
            required
            fullWidth
            error={formData.email.status === Status.Error}
            id='email'
            value={formData.email.value}
            label={t('form.email')}
            onChange={(event) => {
              handleLoginFormChange(
                event as ChangeEvent<HTMLInputElement>,
                'email',
              );
            }}
            name='email'
            autoComplete='email'
            autoFocus
          />
          <TextField
            margin='normal'
            required
            fullWidth
            error={formData.password.status === Status.Error}
            name='password'
            label={t('form.password')}
            onChange={(event) => {
              handleLoginFormChange(
                event as ChangeEvent<HTMLInputElement>,
                'password',
              );
            }}
            type='password'
            id='password'
            value={formData.password.value}
            autoComplete='password'
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
                <CustomLink variant='body2' to={''}>
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
