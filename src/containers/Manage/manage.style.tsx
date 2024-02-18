import { Container, ContainerProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledManage = styled(Container)<ContainerProps>(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));
