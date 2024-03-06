import { CustomFeatureCard } from '@components/CustomFeatureCard';
import { StyledFeatureCardSection } from './featureCardSection.style';

const featureSetContent = [
  {
    title: 'Mock Feature Title',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem distinctio quidem dolor quae nihil repellendus totam illum porro iste pariatur sint eos, aliquam dicta soluta accusantium amet, modi at maiores!',
    cardImgSrc:
      'https://endlessicons.com/wp-content/uploads/2012/11/image-holder-icon.png',
  },
  {
    title: 'Mock Feature Title',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem distinctio quidem dolor quae nihil repellendus totam illum porro iste pariatur sint eos, aliquam dicta soluta accusantium amet, modi at maiores!',
    cardImgSrc:
      'https://endlessicons.com/wp-content/uploads/2012/11/image-holder-icon.png',
  },
  {
    title: 'Mock Feature Title',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem distinctio quidem dolor quae nihil repellendus totam illum porro iste pariatur sint eos, aliquam dicta soluta accusantium amet, modi at maiores!',
    cardImgSrc:
      'https://endlessicons.com/wp-content/uploads/2012/11/image-holder-icon.png',
  },
];

export const FeatureCardSection = () => (
  <StyledFeatureCardSection>
    {featureSetContent.map(({ title, description, cardImgSrc }, index) => (
      <CustomFeatureCard
        title={title}
        description={description}
        cardImgSrc={cardImgSrc}
        key={title + index}
      />
    ))}
  </StyledFeatureCardSection>
);
