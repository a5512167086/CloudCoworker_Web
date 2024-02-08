import { Box, Typography } from '@mui/material';
import { StyledHero } from './customHero.style';
import { CustomHeroProps } from './customHero.type';
import { useTranslation } from 'react-i18next';

export const CustomHero = ({
  heroImageSrc,
  title,
  descrption,
}: CustomHeroProps) => {
  const { t } = useTranslation();

  return (
    <StyledHero heroImageSrc={heroImageSrc} disableGutters maxWidth={false}>
      <Box className='hero_titleBox'>
        <Typography className='hero_title' component='h1'>
          {t(title ? title : '')}
        </Typography>
      </Box>
      <Box className='hero_descrptionBox'>
        <Typography className='hero_descrption' component='h3'>
          {t(descrption ? descrption : '')}
        </Typography>
      </Box>
    </StyledHero>
  );
};
