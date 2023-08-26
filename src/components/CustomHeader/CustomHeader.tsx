import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES_WITHOUT_AUTH } from './customHeader.config';
import { PAGE_PATHS } from '@routes/index';
import { StyledHeader } from './customHeader.style';
import { Box, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { CustomRouteDrawer } from '@components/CustomRouteDrawer';
import { useState } from 'react';
import { LanguageChanger } from '@components/LanguageChanger';

export const CustomHeader = () => {
  const container = document.querySelector('#root');
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const handleRedirect = (link: string) => {
    navigate(link);
  };

  const handleDrawerToggle = () => {
    setIsDrawerOpen((prevState) => !prevState);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

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
              {ROUTES_WITHOUT_AUTH.map(({ title, link }) => (
                <Button
                  key={title}
                  className='header_link'
                  onClick={() => {
                    handleRedirect(link);
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
          routes={ROUTES_WITHOUT_AUTH}
        />
      </Container>
    </StyledHeader>
  );
};
