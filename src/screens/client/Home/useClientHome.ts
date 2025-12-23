import {
  ApiClientHomeModal,
  ApiExpertiesModal,
  ApiProfileModal,
} from '../../../models/api/models';
import {
  IClientHomeModal,
  IProfileModal,
  transformClientHomeModal,
  transformExpertiesModal,
  transformProfileModal,
} from '../../../models/formattedAPI/formatedModals';
import { getAPIData } from '../../../services/api/getApi/getAPI';
import { useEffect, useState } from 'react';
import { appImages } from '../../../config/images/imagePath';
import { setUserData } from '../../../redux/features/userSlice';
import { useDispatch } from 'react-redux';
import { endPoints } from '../../../config/endPoint/apiEndPoint';

export function useClientHome() {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const [homeData, setHomeData] = useState<IClientHomeModal>({
    bookings: [],
    workshops: [],
    expertises: [],
    isSubscriber: false,
  });

  const [profileData, setProfileData] = useState<IProfileModal>({
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
    const res: ApiExpertiesModal[] = await getAPIData(endPoints.expertises);
    const transformedData = res.map(r => transformExpertiesModal(r));

    setHomeData({
      bookings: [],
      workshops: [],
      isSubscriber: false,
      expertises: transformedData,
    });
  };

  const getData = async () => {
    try {
      const data: ApiClientHomeModal = await getAPIData(endPoints.clientHome);
      const transformedData1 = transformClientHomeModal(data);
      setHomeData(transformedData1);
      const res: ApiProfileModal = await getAPIData(
        endPoints.consultantProfile,
      );
      const transformedData2 = transformProfileModal(res);
      setProfileData(transformedData2);
      dispatch(
        setUserData({
          id: transformedData2.id,
          name: transformedData2.name,
          role: transformedData2.role,
          email: transformedData2.email,
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
