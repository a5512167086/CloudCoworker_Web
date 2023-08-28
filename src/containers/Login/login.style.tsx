import { Container, ContainerProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledLogin = styled(Container)<ContainerProps>(() => ({
  '& .login_container': {
    marginTop: '60px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  '& .login_formContainer': {
    marginTop: '20px',
  },
  '& .login_formButton': {
    margin: '30px 0',
  },
}));
