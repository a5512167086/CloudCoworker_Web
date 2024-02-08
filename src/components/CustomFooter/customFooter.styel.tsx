import { Box, BoxProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledFooter = styled(Box)<BoxProps>(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
  padding: '30px',
  position: 'absolute',
  bottom: 0,
  width: '100%',
  justifyContent: 'flex-end',
}));
