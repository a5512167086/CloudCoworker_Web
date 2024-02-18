import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES_WITHOUT_AUTH, ROUTES_WITH_AUTH } from './customHeader.config';
import { PAGE_PATHS } from '@routes/index';
import { StyledHeader } from './customHeader.style';
import { Box, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { CustomRouteDrawer } from '@components/CustomRouteDrawer';
import { useEffect, useState } from 'react';
import { LanguageChanger } from '@components/LanguageChanger';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/index';
import { checkIsAuth } from '@utils/helpers';
import { initUserState } from '@store/modules/userSlice';

export const CustomHeader = () => {
  const container = document.querySelector('#root');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const { userName, userEmail, userToken } = useSelector(
    (state: RootState) => state.user,
  );
  const [isAuth, setIsAuth] = useState(false);

  const handleRedirect = (title: string, link: string) => {
    if (title.includes('about')) {
      window.location.href = link;
    } else if (isAuth && title.includes('logout') && link === '') {
      // handle logout
      dispatch(initUserState());
      navigate(PAGE_PATHS.BASE);
    } else {
      navigate(link);
    }
  };

  const handleDrawerToggle = () => {
    setIsDrawerOpen((prevState) => !prevState);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  useEffect(() => {
    if (checkIsAuth(userName, userEmail, userToken!)) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [userName, userEmail, userToken]);

  return (
    <StyledHeader position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Box
            display='flex'
            width='100%'
            justifyContent='space-between'
            alignItems='center'>
            <IconButton
              className='header_menuButton'
              onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
            <Typography
              variant='h6'
              noWrap
              component={Link}
              to={PAGE_PATHS.BASE}
              className='header_title'>
              {t('header.title')}
            </Typography>
            <Box className='header_linkContainer'>
              {isAuth
                ? ROUTES_WITH_AUTH.map(({ title, link }) => (
                    <Button
                      key={title}
                      className='header_link'
                      onClick={() => {
                        handleRedirect(title, link);
                      }}>
                      {t(title)}
                    </Button>
                  ))
                : ROUTES_WITHOUT_AUTH.map(({ title, link }) => (
                    <Button
                      key={title}
                      className='header_link'
                      onClick={() => {
                        handleRedirect(title, link);
                      }}>
                      {t(title)}
                    </Button>
                  ))}
              <LanguageChanger />
            </Box>
          </Box>
        </Toolbar>
        <CustomRouteDrawer
          container={container}
          variant='temporary'
          open={isDrawerOpen}
          ModalProps={{
            keepMounted: true,
          }}
          handleDrawerToggle={handleDrawerToggle}
          handleDrawerClose={handleDrawerClose}
          routes={isAuth ? ROUTES_WITH_AUTH : ROUTES_WITHOUT_AUTH}
        />
      </Container>
    </StyledHeader>
  );
};
