import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { StyledFooter } from './customFooter.styel';
import { useTranslation } from 'react-i18next';

export const CustomFooter = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear() + '.';
  const footerContent = {
    copyRight: 'footer.copyRight',
    developerName: 'footer.developerName',
  };

  return (
    <StyledFooter component='footer'>
      <Container maxWidth='sm'>
        <Typography variant='body2' color='text.secondary' align='center'>
          {t(footerContent.copyRight)}
          <Link color='inherit' href='https://github.com/a5512167086'>
            {t(footerContent.developerName)}
          </Link>
          {' ' + currentYear}
        </Typography>
      </Container>
    </StyledFooter>
  );
};
