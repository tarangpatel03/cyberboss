import { appImages } from '@config/images/imagePath';

export type onboardingDataProps = {
  id: string;
  imagePathLight: number | { uri: string } | undefined;
  imagePathDark: number | { uri: string } | undefined;
  title: string;
  subTitle: string;
};

export const onboardingData: onboardingDataProps[] = [
  {
    id: '1',
    imagePathLight: appImages.img_lightOnboarding1,
    imagePathDark: appImages.img_darkOnboarding1,
    title: 'onboardingTitle1',
    subTitle: 'onboardingSubTitle1',
  },
  {
    id: '2',
    imagePathLight: appImages.img_lightOnboarding2,
    imagePathDark: appImages.img_darkOnboarding2,
    title: 'onboardingTitle2',
    subTitle: 'onboardingSubTitle2',
  },
  {
    id: '3',
    imagePathLight: appImages.img_lightOnboarding3,
    imagePathDark: appImages.img_darkOnboarding3,
    title: 'onboardingTitle3',
    subTitle: 'onboardingSubTitle3',
  },
  {
    id: '4',
    imagePathLight: appImages.img_lightOnboarding4,
    imagePathDark: appImages.img_darkOnboarding4,
    title: 'onboardingTitle4',
    subTitle: 'onboardingSubTitle4',
  },
];
