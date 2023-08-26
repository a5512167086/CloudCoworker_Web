import { Drawer, DrawerProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledDrawer = styled(Drawer)<DrawerProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    display: 'none',
  },
  '& .MuiDrawer-paper': {
    boxSizing: 'border-box',
    width: '60%',
  },
  '& .drawer_listButton': {
    textAlign: 'center',
  },
}));
