import { CustomHero } from '@components/CustomHero';
import { StyledMain } from './main.style';
import mainHeroImage from '@assets/images/companyHeroBackground.jpg';
import { FeatureCardSection } from '@components/FeatureCardSection';

export const Main = () => {
  const mainContent = {
    heroTitle: 'main.hero.title',
    heroDescription: 'main.hero.description',
  };

  return (
    <StyledMain disableGutters maxWidth={false}>
      <CustomHero
        heroImageSrc={mainHeroImage}
        title={mainContent.heroTitle}
        descrption={mainContent.heroDescription}
      />
      <FeatureCardSection />
    </StyledMain>
  );
};
