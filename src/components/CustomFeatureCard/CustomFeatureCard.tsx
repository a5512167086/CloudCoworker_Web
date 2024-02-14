import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { StyledCustomFeatureCard } from './customFeatureCard.style';
import { CustomFeatureCardProps } from './customFeatureCard.type';
import { useTranslation } from 'react-i18next';

export const CustomFeatureCard = ({
  title,
  description,
  cardImgSrc,
}: CustomFeatureCardProps) => {
  const { t } = useTranslation();

  return (
    <StyledCustomFeatureCard>
      <CardHeader title={t(title)} />
      <CardMedia component='img' image={cardImgSrc} />
      <CardContent>
        <Typography variant='body2' color='text.secondary'>
          {t(description)}
        </Typography>
      </CardContent>
    </StyledCustomFeatureCard>
  );
};
