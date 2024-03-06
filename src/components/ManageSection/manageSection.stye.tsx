import { Container, ContainerProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledManageSection = styled(Container)<ContainerProps>(
  ({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    height: '100%',
    '& .manage_contentBox': {
      width: '100%',
      height: '76vh',
    },
    '& .manage_cardContentBox': {
      height: '76vh',
      display: 'flex',
      flexDirection: 'column',
    },
    '& .manage_deleteButton': {
      marginLeft: 'auto',
    },
    '& .manage_listBox': {
      overflowY: 'scroll',
      height: 'inherit',
      paddingRight: '5px',
    },
    '& .manage_listItem': {
      border: '1px solid lightgray',
      borderRadius: '10px',
      marginBottom: '10px',
    },
    '& .manage_title': {
      display: 'flex',
      alignItems: 'center',
      [theme.breakpoints.down('sm')]: {
        fontSize: '28px',
      },
    },
    '& .manage_description': {
      [theme.breakpoints.down('sm')]: {
        fontSize: '18px',
      },
    },
    '& .manage_listItemText': {
      '& span': {
        [theme.breakpoints.down('sm')]: {
          fontSize: '14px',
        },
      },
      '& p': {
        [theme.breakpoints.down('sm')]: {
          fontSize: '12px',
        },
      },
    },
  }),
);
