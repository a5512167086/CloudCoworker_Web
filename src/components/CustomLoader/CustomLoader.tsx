import { Box, CircularProgress } from '@mui/material';

export const CustomLoader = () => (
  <Box display='flex' justifyContent='center' alignItems='center' height='65vh'>
    <CircularProgress />
  </Box>
);
