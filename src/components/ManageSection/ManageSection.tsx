import { RootState } from '@store/index';
import { useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { StyledManageSection } from './manageSection.stye';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

const manageContent = {
  button: {
    delete: 'button.delete',
    leave: 'button.leave',
  },
};

export const ManageSection = () => {
  const {
    organizationName,
    organizationOwner,
    organizationMembers,
    organizationInviteCode,
  } = useSelector((state: RootState) => state.organization);
  const { isOrganizationOwner } = useSelector((state: RootState) => state.user);
  const { t } = useTranslation();

  return (
    <StyledManageSection>
      <Card className='manage_contentBox'>
        <CardContent component='div' className='manage_cardContentBox'>
          <Typography
            gutterBottom
            variant='h4'
            component='div'
            className='manage_title'>
            <ApartmentIcon /> {organizationName}
            {isOrganizationOwner ? (
              <Button
                className='manage_deleteButton'
                variant='contained'
                color='error'>
                {t(manageContent.button.delete)}
              </Button>
            ) : (
              <Button
                className='manage_deleteButton'
                variant='contained'
                color='error'>
                {t(manageContent.button.leave)}
              </Button>
            )}
          </Typography>
          <Typography
            variant='h5'
            color='text.secondary'
            className='manage_description'>
            {`擁有人 ${organizationOwner.userName}`}
          </Typography>
          <Typography
            variant='h5'
            color='text.secondary'
            className='manage_description'>
            {`邀請碼 ${organizationInviteCode}`}
          </Typography>
          <Typography
            variant='h5'
            color='text.secondary'
            className='manage_description'>
            {`成員人數 ${organizationMembers.length + 1}`}
          </Typography>
          <List className='manage_listBox'>
            {organizationMembers.map((member) => (
              <ListItem
                key={member.userEmail}
                className='manage_listItem'
                secondaryAction={
                  isOrganizationOwner ? (
                    <IconButton edge='end'>
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                  ) : null
                }>
                <ListItemText
                  primary={member.userName}
                  secondary={member.userEmail}
                  className='manage_listItemText'
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </StyledManageSection>
  );
};
