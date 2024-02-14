import { Card, CardProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledCustomFeatureCard = styled(Card)<CardProps>(({ theme }) => ({
  maxWidth: 345,
  margin: '15px 0',
  borderRadius: '10px',
  border: '0.5px solid',
  borderColor: theme.palette.grey[300],
  boxShadow:
    '6px -5px 2px 2px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
}));
