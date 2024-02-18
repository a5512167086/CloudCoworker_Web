import { Container, ContainerProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledCustomManageForm = styled(Container)<ContainerProps>(
  ({ theme }) => ({
    marginTop: '60px',
    textAlign: 'center',
    '& .manage_formContainer': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    '& .manage_icon': {
      margin: '10px 0',
      backgroundColor: theme.palette.common.black,
    },
    '& .manage_or': {
      margin: '30px 0',
    },
  }),
);
