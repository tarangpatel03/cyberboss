import { getAPIData } from '../../../services/api/common/getCommonApi';
import { useEffect, useState } from 'react';
import { setIsPro, setUserData } from '../../../redux/features/userSlice';
import { useDispatch } from 'react-redux';
import { endPoints } from '../../../config/endPoint/apiEndPoint';
import { apiExpertiseModel } from '../../../models/api/consultant';
import { apiClientHomeModel } from '../../../models/api/home';
import { apiProfileModel } from '../../../models/api/profile';
import {
  tExpertiseModel,
  transformExpertiseModel,
} from '../../../models/formattedAPI/tConsultant';
import {
  tClientHomeModel,
  transformClientHomeModal,
} from '../../../models/formattedAPI/tHome';
import { transformProfileModel } from '../../../models/formattedAPI/tProfile';
import { ApiResponse } from '../../../models/apiModel';

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

  const handleHomeScreenWithoutLogIn = async () => {
    const response = await getAPIData<ApiResponse<apiExpertiseModel[]>>(
      endPoints.expertise,
    );
    if (!response) return;
    const data: apiExpertiseModel[] = response.payload;
    const transformedData: tExpertiseModel[] = data.map(r =>
      transformExpertiseModel(r),
    );
    setHomeData({
      bookings: [],
      workshops: [],
      isSubscriber: false,
      expertises: transformedData,
    });
  };

  const getData = async () => {
    try {
      const response = await getAPIData<ApiResponse<apiClientHomeModel>>(
        endPoints.clientHome,
      );
      if (!response) return;
      const data1: apiClientHomeModel = response.payload;
      const transformedData1 = transformClientHomeModal(data1);
      setHomeData(transformedData1);
      const response2 = await getAPIData<ApiResponse<apiProfileModel>>(
        endPoints.consultantProfile,
      );
      if (!response2) return;
      const data2: apiProfileModel = response2.payload;
      const transformedData2 = transformProfileModel(data2);
      dispatch(
        setUserData({
          id: transformedData2.id,
          name: transformedData2.name,
          email: transformedData2.email,
          profile_setup: transformedData2.profileSetup,
          profilePicture: transformedData2.profilePicture,
        }),
        setIsPro(transformedData1.isSubscriber),
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

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    loader,
    refreshing,
    homeData,
    onRefresh,
  } as const;
}
