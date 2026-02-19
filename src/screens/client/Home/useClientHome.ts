import { getAPIData } from '@services/api/common/getCommonApi';
import { useEffect, useState } from 'react';
import { setIsPro, setUserData } from '@redux/features/userSlice';
import { useDispatch } from 'react-redux';
import { ApiExpertiseModel } from '@models/api/consultant';
import { ApiClientHomeModel } from '@models/api/home';
import { ApiProfileModel } from '@models/api/profile';
import {
  TExpertiseModel,
  transformExpertiseModel,
} from '@models/formattedAPI/tConsultant';
import {
  TClientHomeModel,
  transformClientHomeModal,
} from '@models/formattedAPI/tHome';
import { transformProfileModel } from '@models/formattedAPI/tProfile';
import { ApiResponse } from '@models/apiModel';
import { Config } from '@config/index';
import { Utils } from '@utils/index';

export function useClientHome() {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const [homeData, setHomeData] = useState<TClientHomeModel>({
    bookings: [],
    workshops: [],
    expertises: [],
    isSubscriber: false,
  });

  const handleHomeScreenWithoutLogIn = async () => {
    const response = await getAPIData<ApiResponse<ApiExpertiseModel[]>>(
      Config.endPoints.expertise,
    );
    if (!response) return;
    const data: ApiExpertiseModel[] = response.payload;
    const transformedData: TExpertiseModel[] = data.map(r =>
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
      const response = await getAPIData<ApiResponse<ApiClientHomeModel>>(
        Config.endPoints.clientHome,
      );
      if (!response) return;
      const data1: ApiClientHomeModel = response.payload;
      const transformedData1 = transformClientHomeModal(data1);
      setHomeData(transformedData1);
      const response2 = await getAPIData<ApiResponse<ApiProfileModel>>(
        Config.endPoints.consultantProfile,
      );
      if (!response2) return;
      const data2: ApiProfileModel = response2.payload;
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
      Utils.showErrorToast({ title: error as string });
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
