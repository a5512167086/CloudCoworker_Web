import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { StyledDrawer } from './customRouteDrawer.style';
import { useNavigate } from 'react-router-dom';
import { CustomRouteDrawerProps } from './customRouteDrawer.type';
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  DrawerProps,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { LanguageChanger } from '@components/LanguageChanger';

export const CustomRouteDrawer = ({
  routes,
  open,
  handleDrawerToggle,
  handleDrawerClose,
}: CustomRouteDrawerProps & DrawerProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'));
  const handleRedirect = (link: string) => {
    handleDrawerToggle();
    navigate(link);
  };

  useEffect(() => {
    if (smUp) {
      handleDrawerClose();
    }
  }, [smUp]);

  return (
    <StyledDrawer open={open} onClick={handleDrawerToggle}>
      <Box onClick={handleDrawerToggle}>
        <List className='drawer_listContainer'>
          {routes.map(({ title, link }) => (
            <div key={title}>
              <ListItem disablePadding>
                <ListItemButton
                  className='drawer_listButton'
                  onClick={() => {
                    handleRedirect(link);
                  }}>
                  <ListItemText primary={t(title)} />
                </ListItemButton>
              </ListItem>
              <Divider />
            </div>
          ))}
          <ListItem className='drawer_listLanguageChanger'>
            <LanguageChanger />
          </ListItem>
          <Divider />
        </List>
      </Box>
    </StyledDrawer>
  );
};
