import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ApartmentIcon from '@mui/icons-material/Apartment';
import Typography from '@mui/material/Typography';
import { StyledCustomManageForm } from './customManageForm.style';
import { useTranslation } from 'react-i18next';

export const CustomManageForm = () => {
  const { t } = useTranslation();
  const manageFormContent = {
    title1: 'manage.title1',
    button1: 'manage.button1',
    title2: 'manage.title2',
    button2: 'manage.button2',
    or: 'manage.or',
    organizationName: 'manage.organizationName',
    inviteCode: 'manage.inviteCode',
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <StyledCustomManageForm maxWidth='xs'>
      <Box className='manage_formContainer'>
        <Avatar className='manage_icon'>
          <ApartmentIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          {t(manageFormContent.title1)}
        </Typography>
        <Box width='100%' component='form' onSubmit={handleSubmit} noValidate>
          <TextField
            margin='normal'
            required
            fullWidth
            id='organizationName'
            label={t(manageFormContent.organizationName)}
            name='organizationName'
            autoComplete='organizationName'
          />
          <Button type='submit' fullWidth variant='contained'>
            {t(manageFormContent.button1)}
          </Button>
        </Box>
        <Typography component='h1' variant='h5' className='manage_or'>
          {t(manageFormContent.or)}
        </Typography>
        <Box width='100%' component='form' onSubmit={handleSubmit} noValidate>
          <Typography component='h1' variant='h5'>
            {t(manageFormContent.title2)}
          </Typography>
          <TextField
            margin='normal'
            required
            fullWidth
            id='inviteCode'
            label={t(manageFormContent.inviteCode)}
            name='inviteCode'
            autoComplete='inviteCode'
          />
          <Button type='submit' fullWidth variant='contained'>
            {t(manageFormContent.button2)}
          </Button>
        </Box>
      </Box>
    </StyledCustomManageForm>
  );
};
