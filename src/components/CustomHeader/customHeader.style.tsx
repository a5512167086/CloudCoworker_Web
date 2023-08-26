import { AppBar, AppBarProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledHeader = styled(AppBar)<AppBarProps>(({ theme }) => ({
  position: 'relative',
  '& .header_title': {
    '-webkit-tap-highlight-color': 'transparent',
    color: theme.palette.common.white,
    textDecoration: 'none',
    [theme.breakpoints.down('sm')]: {
      fontSize: '18px',
      width: '100%',
      textAlign: 'center',
    },
  },
  '& .header_linkContainer': {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  '& .header_link': {
    color: theme.palette.common.white,
    fontSize: '16px',
  },
  '& .header_menuButton': {
    position: 'absolute',
    color: theme.palette.common.white,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}));
