import { Container, ContainerProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CustomHeroProps } from './customHero.type';

export const StyledHero = styled(Container, {
  shouldForwardProp: (props) => props !== 'heroImageSrc',
})<ContainerProps & CustomHeroProps>(({ theme, heroImageSrc }) => ({
  width: '100%',
  height: '600px',
  margin: 0,
  padding: 0,
  backgroundImage: `url(${heroImageSrc ? heroImageSrc : null})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  color: theme.palette.common.white,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  [theme.breakpoints.down('lg')]: {
    height: '550px',
  },
  [theme.breakpoints.down('md')]: {
    height: '350px',
  },
  [theme.breakpoints.down('sm')]: {
    height: '250px',
  },
  '& .hero_titleBox': {
    width: '65%',
    textAlign: 'center',
    '.hero_title': {
      fontSize: '40px',
      [theme.breakpoints.down('lg')]: {
        fontSize: '30px',
      },
      [theme.breakpoints.down('md')]: {
        fontSize: '22px',
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: '14px',
      },
    },
  },
  '& .hero_descrptionBox': {
    marginTop: '15px',
    width: '60%',
    textAlign: 'center',
    '.hero_descrption': {
      fontSize: '20px',
      [theme.breakpoints.down('lg')]: {
        fontSize: '18px',
      },
      [theme.breakpoints.down('md')]: {
        fontSize: '14px',
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: '10px',
      },
    },
  },
}));
