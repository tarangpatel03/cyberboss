import { appImages } from '../../../config/images/imagePath';

export type OnboardingDataProps = {
  id: string;
  imagePathLight: number | { uri: string } | undefined;
  imagePathDark: number | { uri: string } | undefined;
  title: string;
  subTitle: string;
};

export const onboardingData: OnboardingDataProps[] = [
  {
    id: '1',
    imagePathLight: appImages.img_lightOnboarding1,
    imagePathDark: appImages.img_darkOnboarding1,
    title: 'onboardingtitle1',
    subTitle: 'onboardingsubTitle1',
  },
  {
    id: '2',
    imagePathLight: appImages.img_lightOnboarding2,
    imagePathDark: appImages.img_darkOnboarding2,
    title: 'onboardingtitle2',
    subTitle: 'onboardingsubTitle2',
  },
  {
    id: '3',
    imagePathLight: appImages.img_lightOnboarding3,
    imagePathDark: appImages.img_darkOnboarding3,
    title: 'onboardingtitle3',
    subTitle: 'onboardingsubTitle3',
  },
  {
    id: '4',
    imagePathLight: appImages.img_lightOnboarding4,
    imagePathDark: appImages.img_darkOnboarding4,
    title: 'onboardingtitle4',
    subTitle: 'onboardingsubTitle4',
  },
];
