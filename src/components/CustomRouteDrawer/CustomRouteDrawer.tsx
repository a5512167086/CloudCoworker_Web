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
        <List>
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
        </List>
      </Box>
    </StyledDrawer>
  );
};
