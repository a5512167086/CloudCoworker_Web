import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ApartmentIcon from '@mui/icons-material/Apartment';
import Typography from '@mui/material/Typography';
import { StyledCustomManageForm } from './customManageForm.style';
import { useTranslation } from 'react-i18next';
import { ChangeEvent, useState } from 'react';
import { ManageFormData, Status } from '@configs/type';
import { isEmpty } from '@utils/helpers';
import { MANAGE_FORM_KEYS } from '@configs/common';

const manageFormContent = {
  title1: 'manage.title1',
  button1: 'manage.button1',
  title2: 'manage.title2',
  button2: 'manage.button2',
  or: 'manage.or',
  organizationName: 'manage.organizationName',
  inviteCode: 'manage.inviteCode',
};

const initManageFormState: ManageFormData = {
  organizationName: { value: '', status: Status.Idle, errorText: '' },
  inviteCode: { value: '', status: Status.Idle, errorText: '' },
};

export const CustomManageForm = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState(initManageFormState);

  const handleManageFormBlur = (key: keyof ManageFormData) => {
    let currentStatus = { status: Status.Success, errorText: '' };
    if (isEmpty(formData[key]!.value)) {
      currentStatus = {
        status: Status.Error,
        errorText: 'form.empty_error_text',
      };
    }

    setFormData((prev) => {
      const currentFormData = prev;
      currentFormData[key]!.status = currentStatus.status;
      currentFormData[key]!.errorText = currentStatus.errorText;
      return { ...currentFormData };
    });
  };

  const handleManageFormChange = (
    event: ChangeEvent<HTMLInputElement>,
    key: keyof ManageFormData,
  ) => {
    setFormData((prev) => {
      const currentFormData = prev;
      currentFormData[key]!.value = event.target.value;
      return { ...currentFormData };
    });
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
            value={formData.organizationName!.value}
            error={formData.organizationName!.status === Status.Error}
            helperText={t(formData.organizationName!.errorText, {
              key: t(manageFormContent.organizationName),
            })}
            id={MANAGE_FORM_KEYS.ORGANIZATION_NAME}
            label={t(manageFormContent.organizationName)}
            onChange={(event) => {
              handleManageFormChange(
                event as ChangeEvent<HTMLInputElement>,
                MANAGE_FORM_KEYS.ORGANIZATION_NAME as keyof ManageFormData,
              );
            }}
            onBlur={() => {
              handleManageFormBlur(
                MANAGE_FORM_KEYS.ORGANIZATION_NAME as keyof ManageFormData,
              );
            }}
            name={MANAGE_FORM_KEYS.ORGANIZATION_NAME}
            autoComplete={MANAGE_FORM_KEYS.ORGANIZATION_NAME}
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
            value={formData.inviteCode!.value}
            error={formData.inviteCode!.status === Status.Error}
            helperText={t(formData.inviteCode!.errorText, {
              key: t(manageFormContent.inviteCode),
            })}
            id={MANAGE_FORM_KEYS.INVITE_CODE}
            label={t(manageFormContent.inviteCode)}
            onChange={(event) => {
              handleManageFormChange(
                event as ChangeEvent<HTMLInputElement>,
                MANAGE_FORM_KEYS.INVITE_CODE as keyof ManageFormData,
              );
            }}
            onBlur={() => {
              handleManageFormBlur(
                MANAGE_FORM_KEYS.INVITE_CODE as keyof ManageFormData,
              );
            }}
            name={MANAGE_FORM_KEYS.INVITE_CODE}
            autoComplete={MANAGE_FORM_KEYS.INVITE_CODE}
          />
          <Button type='submit' fullWidth variant='contained'>
            {t(manageFormContent.button2)}
          </Button>
        </Box>
      </Box>
    </StyledCustomManageForm>
  );
};
