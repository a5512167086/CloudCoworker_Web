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
  '& .drawer_listContainer': {
    padding: 0,
  },
  '& .drawer_listButton': {
    padding: '15px 0',
    textAlign: 'center',
  },
  '& .drawer_listLanguageChanger': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
