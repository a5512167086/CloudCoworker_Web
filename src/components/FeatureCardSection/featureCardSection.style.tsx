import { Container, ContainerProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledFeatureCardSection = styled(Container)<ContainerProps>(
  () => ({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    margin: '40px 0',
  }),
);
