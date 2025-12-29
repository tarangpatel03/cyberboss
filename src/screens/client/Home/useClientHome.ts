import { getAPIData } from '../../../services/api/common/getCommonApi';
import { useEffect, useState } from 'react';
import { appImages } from '../../../config/images/imagePath';
import { setUserData } from '../../../redux/features/userSlice';
import { useDispatch } from 'react-redux';
import { endPoints } from '../../../config/endPoint/apiEndPoint';
import { apiExpertiesModel } from '../../../models/api/consultant';
import { apiClientHomeModel } from '../../../models/api/home';
import { apiProfileModel } from '../../../models/api/profile';
import { transformExpertiesModel } from '../../../models/formattedAPI/tConsultant';
import {
  tClientHomeModel,
  transformClientHomeModal,
} from '../../../models/formattedAPI/tHome';
import {
  tProfileModel,
  transformProfileModel,
} from '../../../models/formattedAPI/tProfile';

export function useClientHome() {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const [homeData, setHomeData] = useState<tClientHomeModel>({
    bookings: [],
    workshops: [],
    expertises: [],
    isSubscriber: false,
  });

  const [profileData, setProfileData] = useState<tProfileModel>({
    id: '',
    email: '',
    bio: null,
    rate: null,
    name: 'User',
    loginType: '',
    services: [],
    role: 'client',
    expertises: [],
    isVerified: null,
    phoneNumber: null,
    profileSetup: false,
    experienceYear: null,
    profilePicture: appImages.img_defaultProfile,
  });

  const handleHomeScreenWithoutLogIn = async () => {
    const res: apiExpertiesModel[] = await getAPIData(endPoints.expertises);
    const transformedData = res.map(r => transformExpertiesModel(r));

    setHomeData({
      bookings: [],
      workshops: [],
      isSubscriber: false,
      expertises: transformedData,
    });
  };

  const getData = async () => {
    try {
      const data: apiClientHomeModel = await getAPIData(endPoints.clientHome);
      const transformedData1 = transformClientHomeModal(data);
      setHomeData(transformedData1);
      const res: apiProfileModel = await getAPIData(
        endPoints.consultantProfile,
      );
      const transformedData2 = transformProfileModel(res);
      setProfileData(transformedData2);
      dispatch(
        setUserData({
          id: transformedData2.id,
          name: transformedData2.name,
          email: transformedData2.email,
          profile_setup: transformedData2.profileSetup,
          profilePicture: transformedData2.profilePicture,
        }),
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      await handleHomeScreenWithoutLogIn();
    } finally {
      setLoader(false);
    }
  };

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await getData();
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
      setLoader(false);
    }
  };

  const getPicture = () => {
    if (typeof profileData.profilePicture === 'string') {
      return { uri: profileData.profilePicture };
    } else {
      return profileData.profilePicture;
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    loader,
    refreshing,
    homeData,
    profileData,
    onRefresh,
    getPicture,
  } as const;
}
